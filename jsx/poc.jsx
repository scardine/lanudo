
var Child = React.createClass({
    handleClick: function (ev, k) {
        bean.fire.bind(null, window, 'foo', [this.props.x, ev, k])();
    },
    render: function () {
        return (
            <div className="foo" onClick={this.handleClick}>
                {this.props.x}
            </div>
        )
    }
});

var Parent = React.createClass({
    componentDidMount: function () {
        bean.on(window, 'foo', this.fooHandler);
    },
    componentWillUnmount: function () {
        bean.remove(window, 'foo');
    },
    fooHandler: function () {
        console.log(arguments);
    },
    render: function() {
        return (
            <div className="parent">
                <Child x="1" />
                <Child x="2" />
            </div>
        )
    }
});

React.render(
    <Parent />,
    document.getElementById('content')
);
