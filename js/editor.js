var ToolButton = React.createClass({displayName: 'ToolButton',
    render: function () {
        var className = "btn btn-lg btn-default";
        if (this.props.selected == this.props.icon) {
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
    getInitialState: function () {
        return {
            selected: 'plus'
        }
    },
    handleClick: function(selection, ev, id) {
        this.setState({selected: selection});
        console.log(selection);
    },
    render: function () {
        return (
            React.createElement("div", {className: "btn-group", role: "group", 'aria-label': "toolbar"}, 
                React.createElement(ToolButton, {icon: "hand-up", onClick: this.handleClick.bind(this, 'hand-up'), selected: this.state.selected}), 
                React.createElement(ToolButton, {icon: "move", onClick: this.handleClick.bind(null, 'move'), selected: this.state.selected}), 
                React.createElement(ToolButton, {icon: "plus", onClick: this.handleClick.bind(null, 'plus'), selected: this.state.selected}), 
                React.createElement(ToolButton, {icon: "trash", onClick: this.handleClick.bind(null, 'trash'), selected: this.state.selected}), 
                React.createElement(ToolButton, {icon: "font", onClick: this.handleClick.bind(null, 'font'), selected: this.state.selected}), 
                React.createElement(ToolButton, {icon: "picture", onClick: this.handleClick.bind(null, 'picture'), selected: this.state.selected})
            )
        )
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
                            React.createElement(ToolBar, null)
                        )
                    )
                )
            )
        )
    }
});

var Canvas = React.createClass({displayName: 'Canvas',
    getInitialState: function () {
        return {
            elements: []
        }
    },
    handleClick: function (ev, id) {
        ev.preventDefault();
        var x = ev.pageX - ev.currentTarget.offsetParent.offsetLeft + ev.currentTarget.scrollLeft;
        var y = ev.pageY - 50 + ev.currentTarget.scrollTop;
        console.log(x, y, ev.currentTarget);
        var elements = this.state.elements;
        elements.push({x: Math.floor(x/20), y: Math.floor(y/20)});
        this.setState({elements: elements});
    },
    render: function () {
        var stitches = [];
        this.state.elements.map(function (stitch, i) {
            var style = {
                top: '' + stitch.y * 20 + 'px',
                left: '' + stitch.x * 20 + 'px'
            };
            stitches.push(
                React.createElement("div", {className: "stitch", style: style, key: ['s', i, stitch.x, stitch.y].join('-')})
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
    render: function () {
        return (
            React.createElement("div", {className: "row row-no-padding"}, 
                React.createElement(ToolBox, null), 
                React.createElement(Canvas, null)
            )
        );
    }
});

React.render(
    React.createElement(Interface, null),
    document.getElementById('content')
);