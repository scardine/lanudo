var Stitch = React.createClass({displayName: 'Stitch',
    componentWillMount: function () {
        bean.fire(this, 'stitchClicked');
    },
    render: function () {
        var style = {
            top: '' + this.props.y * 20 + 'px',
            left: '' + this.props.x * 20 + 'px',
            backgroundColor: this.props.color
        };
        return (
            React.createElement("div", {className: "stitch", style: style, key: this.props.key})
        )
    }
});

var Canvas = React.createClass({displayName: 'Canvas',
    handleClick: function (ev, id) {
        ev.preventDefault();
        var x = ev.pageX - ev.currentTarget.offsetParent.offsetLeft + ev.currentTarget.scrollLeft;
        var y = ev.pageY - 50 + ev.currentTarget.scrollTop;
        console.log(x, y, ev.currentTarget);
        var elements = this.props.elements;
        var needle = {
            x: Math.floor(x/20),
            y: Math.floor(y/20),
            type: 'stitch'
        };
        var stitch = _.find(elements, needle);
        if (stitch === undefined) {
            stitch = needle;
            elements.push(stitch);
        }
        stitch.color = this.props.color.palette[this.props.color.current];
        bean.fire.bind(null, window, 'interfaceCallback', ['elements', elements])();
    },
    render: function () {
        var stitches = [],
            colors = this.props.colors;
        this.props.elements.map(function (stitch, i) {
            stitches.push(
                React.createElement(Stitch, {x: stitch.x, y: stitch.y, color: stitch.color})
            )
        });
        return (
            React.createElement("div", {className: "col-sm-9"}, 
                React.createElement("div", {className: "canvas-container", onClick: this.handleClick}, 
                    React.createElement("div", {className: "canvas"}, 
                    stitches
                    )
                )
            )
        )
    }
});

var Interface = React.createClass({displayName: 'Interface',
    componentDidMount: function () {
        bean.on(window, 'interfaceCallback', this.handleInterfaceCallback);
    },
    componentWillUnmount: function () {
        bean.remove(window, 'interfaceCallback');
    },
    handleInterfaceCallback: function (key, value) {
        console.log(arguments);
        this.setState({key: value});
    },
    getInitialState: function () {
        return {
            tool: {
                current: 0,
                list: [
                    {name: 'stitch', options: {type: 'cross'}},
                    {name: 'select'}
                ]
            },
            color: {
                palette: [
                    '#000000',
                    '#FF0000',
                    '#A28B53',
                    '#FF5C73',
                    '#FCF9F9',
                    '#FFBFC4',
                    '#FFAE9B',
                    '#66791F',
                    '#BBCF29',
                    '#95B245',
                    '#F4FF4F',
                    '#D7EE4A'],
                current: 0
            },
            elements: [],
            selection: []
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "row row-no-padding"}, 
                React.createElement(Canvas, {elements: this.state.elements, color: this.state.color, tool: this.state.tools})
            )
        );
    }
});

React.render(
    React.createElement(Interface, null),
    document.getElementById('content')
);