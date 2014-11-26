var ToolButton = React.createClass({
    render: function () {
        var className = "btn btn-lg btn-default";
        if (this.props.currentTool == this.props.icon) {
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
    render: function () {
        var colorSample = {'backgroundColor': this.props.colors[this.props.currentColor]};
        var colors = [];
        var selectColor = this.props.selectColor;
        this.props.colors.map(function(color, i) {
            var style = {'backgroundColor': color, color: color};
            colors.push(
                <a className="btn btn-default btn-xs" style={style} href="" onClick={selectColor.bind(null, i)}><i className="glyphicon glyphicon-unchecked"></i></a>
            );
        });
        return (
            <div>
                <div className="btn-group" role="group" aria-label="toolbar">
                    <ToolButton icon="hand-up" onClick={this.props.selectTool.bind(null, 'hand-up')} currentTool={this.props.currentTool}/>
                    <ToolButton icon="move" onClick={this.props.selectTool.bind(null, 'move')} currentTool={this.props.currentTool}/>
                    <ToolButton icon="plus" onClick={this.props.selectTool.bind(null, 'plus')} currentTool={this.props.currentTool}/>
                    <ToolButton icon="trash" onClick={this.props.selectTool.bind(null, 'trash')} currentTool={this.props.currentTool}/>
                    <ToolButton icon="font" onClick={this.props.selectTool.bind(null, 'font')} currentTool={this.props.currentTool}/>
                    <ToolButton icon="picture" onClick={this.props.selectTool.bind(null, 'picture')} currentTool={this.props.currentTool}/>
                </div>
                <div>
                    <div>color</div>
                    <div className="color-sample pull-left" style={colorSample}></div>
                    <div className="btn-group" role="group" aria-label="colors">
                        {colors}
                    </div>
                </div>
            </div>
        );
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
                            <ToolBar {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var Canvas = React.createClass({
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
                <div className="stitch" style={style} key={['s', i, stitch.x, stitch.y].join('-')}></div>
            )
        });
        return (
            <div className="col-sm-9">
                <div className="canvas-container" onClick={this.props.clickHandler}>
                    <div className="canvas">
                    {stitches}
                    </div>
                </div>
            </div>
        )
    }
});

var Interface = React.createClass({
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
            <div className="row row-no-padding">
                <ToolBox selectTool={this.selectTool} currentTool={this.state.currentTool} colors={this.state.colors}
                        currentColor={this.state.currentColor} selectColor={this.selectColor} />
                <Canvas clickHandler={this.handleCanvasClick} elements={this.state.elements} colors={this.state.colors} />
            </div>
        );
    }
});

React.render(
    <Interface />,
    document.getElementById('content')
);