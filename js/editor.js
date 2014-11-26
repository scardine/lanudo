var ToolButton = React.createClass({displayName: 'ToolButton',
    render: function () {
        var className = "btn btn-lg btn-default";
        if (this.props.currentTool == this.props.icon) {
            className += ' btn-primary';
        }
        return (
            React.createElement("button", {type: "button", className: className, title: this.props.title, onClick: this.props.onClick}, 
                React.createElement("i", {className: 'glyphicon glyphicon-'+this.props.icon})
            )
        )
    }
});

var ToolBar = React.createClass({displayName: 'ToolBar',
    render: function () {
        var colorSample = {'backgroundColor': this.props.colors[this.props.currentColor]};
        var colors = [];
        var selectColor = this.props.selectColor;
        this.props.colors.map(function(color, i) {
            var style = {'backgroundColor': color, color: color};
            colors.push(
                React.createElement("a", {className: "btn btn-default btn-xs", style: style, href: "", onClick: selectColor.bind(null, i)}, React.createElement("i", {className: "glyphicon glyphicon-unchecked"}))
            );
        });
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "btn-group", role: "group", 'aria-label': "toolbar"}, 
                    React.createElement(ToolButton, {icon: "hand-up", onClick: this.props.selectTool.bind(null, 'hand-up'), currentTool: this.props.currentTool}), 
                    React.createElement(ToolButton, {icon: "move", onClick: this.props.selectTool.bind(null, 'move'), currentTool: this.props.currentTool}), 
                    React.createElement(ToolButton, {icon: "plus", onClick: this.props.selectTool.bind(null, 'plus'), currentTool: this.props.currentTool}), 
                    React.createElement(ToolButton, {icon: "trash", onClick: this.props.selectTool.bind(null, 'trash'), currentTool: this.props.currentTool}), 
                    React.createElement(ToolButton, {icon: "font", onClick: this.props.selectTool.bind(null, 'font'), currentTool: this.props.currentTool}), 
                    React.createElement(ToolButton, {icon: "picture", onClick: this.props.selectTool.bind(null, 'picture'), currentTool: this.props.currentTool})
                ), 
                React.createElement("div", null, 
                    React.createElement("div", null, "color"), 
                    React.createElement("div", {className: "color-sample pull-left", style: colorSample}), 
                    React.createElement("div", {className: "btn-group", role: "group", 'aria-label': "colors"}, 
                        colors
                    )
                )
            )
        );
    }
});

var ToolBox = React.createClass({displayName: 'ToolBox',
    render: function () {
        return (
            React.createElement("div", {className: "col-sm-3"}, 
                React.createElement("div", {className: "tool-container"}, 
                    React.createElement("ul", {className: "nav nav-tabs"}, 
                        React.createElement("li", {role: "presentation", className: "active"}, React.createElement("a", {href: ""}, "tools")), 
                        React.createElement("li", {role: "presentation"}, React.createElement("a", {href: ""}, "colors"))
                    ), 
                    React.createElement("div", {className: "padding"}, 
                        React.createElement("div", {className: "tools"}, 
                            React.createElement(ToolBar, React.__spread({},  this.props))
                        )
                    )
                )
            )
        )
    }
});

var Canvas = React.createClass({displayName: 'Canvas',
    render: function () {
        var stitches = [],
            colors = this.props.colors;
        this.props.elements.map(function (stitch, i) {
            var style = {
                top: '' + stitch.y * 20 + 'px',
                left: '' + stitch.x * 20 + 'px',
                backgroundColor: colors[stitch.color]
            };
            stitches.push(
                React.createElement("div", {className: "stitch", style: style, key: ['s', i, stitch.x, stitch.y].join('-')})
            )
        });
        return (
            React.createElement("div", {className: "col-sm-9"}, 
                React.createElement("div", {className: "canvas-container", onClick: this.props.clickHandler}, 
                    React.createElement("div", {className: "canvas"}, 
                    stitches
                    )
                )
            )
        )
    }
});

var Interface = React.createClass({displayName: 'Interface',
    getInitialState: function () {
        return {
            currentTool: 'plus',
            colors: [
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
                '#D7EE4A'
            ],
            currentColor: 0,
            elements: [],
            selection: []
        }
    },
    handleCanvasClick: function (ev, id) {
        ev.preventDefault();
        var x = ev.pageX - ev.currentTarget.offsetParent.offsetLeft + ev.currentTarget.scrollLeft;
        var y = ev.pageY - 50 + ev.currentTarget.scrollTop;
        console.log(x, y, ev.currentTarget);
        var elements = this.state.elements;
        elements.push({x: Math.floor(x/20), y: Math.floor(y/20), color: this.state.currentColor});
        this.setState({elements: elements});
    },
    selectTool: function (tool, ev, id) {
        ev.preventDefault();
        console.log(arguments);
        this.setState({currentTool: tool});
    },
    selectColor: function (i, ev, id) {
        ev.preventDefault();
        this.setState({currentColor: i});  //TODO: check bounds
    },
    render: function () {
        return (
            React.createElement("div", {className: "row row-no-padding"}, 
                React.createElement(ToolBox, {selectTool: this.selectTool, currentTool: this.state.currentTool, colors: this.state.colors, 
                        currentColor: this.state.currentColor, selectColor: this.selectColor}), 
                React.createElement(Canvas, {clickHandler: this.handleCanvasClick, elements: this.state.elements, colors: this.state.colors})
            )
        );
    }
});

React.render(
    React.createElement(Interface, null),
    document.getElementById('content')
);
