var Stitch = React.createClass({
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
            <div className="stitch" style={style} key={this.props.key}></div>
        )
    }
});

var Canvas = React.createClass({
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
                <Stitch x={stitch.x} y={stitch.y} color={stitch.color} />
            )
        });
        return (
            <div className="col-sm-9">
                <div className="canvas-container" onClick={this.handleClick}>
                    <div className="canvas">
                    {stitches}
                    </div>
                </div>
            </div>
        )
    }
});

var Interface = React.createClass({
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
            <div className="row row-no-padding">
                <Canvas elements={this.state.elements} color={this.state.color} tool={this.state.tools} />
            </div>
        );
    }
});

React.render(
    <Interface />,
    document.getElementById('content')
);