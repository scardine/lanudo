var ToolButton = React.createClass({
    render: function () {
        var className = "btn btn-lg btn-default";
        if (this.props.selected == this.props.icon) {
            className += ' btn-primary';
        }
        return (
            <button type="button" className={className} title={this.props.title} onClick={this.props.onClick}>
                <i className={'glyphicon glyphicon-'+this.props.icon}></i>
            </button>
        )
    }
});

var ToolBar = React.createClass({
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
            <div className="btn-group" role="group" aria-label="toolbar">
                <ToolButton icon="hand-up" onClick={this.handleClick.bind(this, 'hand-up')} selected={this.state.selected}/>
                <ToolButton icon="move" onClick={this.handleClick.bind(null, 'move')} selected={this.state.selected}/>
                <ToolButton icon="plus" onClick={this.handleClick.bind(null, 'plus')} selected={this.state.selected}/>
                <ToolButton icon="trash" onClick={this.handleClick.bind(null, 'trash')} selected={this.state.selected}/>
                <ToolButton icon="font" onClick={this.handleClick.bind(null, 'font')} selected={this.state.selected}/>
                <ToolButton icon="picture" onClick={this.handleClick.bind(null, 'picture')} selected={this.state.selected}/>
            </div>
        )
    }
});

var ToolBox = React.createClass({
    render: function () {
        return (
            <div className="col-sm-3">
                <div className="tool-container">
                    <ul className="nav nav-tabs">
                        <li role="presentation" className="active"><a href="">tools</a></li>
                        <li role="presentation"><a href="">colors</a></li>
                    </ul>
                    <div className="padding">
                        <div className="tools">
                            <ToolBar />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var Canvas = React.createClass({
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
                <div className="stitch" style={style} key={['s', i, stitch.x, stitch.y].join('-')}></div>
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
    render: function () {
        return (
            <div className="row row-no-padding">
                <ToolBox />
                <Canvas />
            </div>
        );
    }
});

React.render(
    <Interface />,
    document.getElementById('content')
);