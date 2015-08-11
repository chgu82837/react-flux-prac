// import SmallTalk from '.'
var React = require('react');


const SmallTalkLi = React.createClass({
  click() {
    console.log(this.props.index);
    this.props.highlight(this.props.index);
  },
  render() {
    var cn = "list-group-item";
    if(this.props.highlighted) cn += " active";
    return (
      <li className={cn} onClick={this.click}>{this.props.index} > {this.props.text}</li>
    );
  }
});

const SmallTalkUl = React.createClass({
  getInitialState: function() {
    return {msgs: [],highlight:false};
  },
  push(v) {
    this.state.msgs.push(v);
    // console.log(this.state.msgs);
    this.setState({msgs: this.state.msgs});
  },
  pop() {
    if(this.state.highlight !== false){
      this.state.msgs.splice(this.state.highlight,1);
      this.state.highlight = false;
    }
    else
      this.state.msgs.pop();
    // console.log(this.state.msgs);
    this.setState({msgs: this.state.msgs,highlight:this.state.highlight});
  },
  highlight(index) {
    this.setState({highlight: index === this.state.highlight ? false : index});
  },
  render() {
    var highlight = this.highlight;
    var highlighted = this.state.highlight;
    return (
      <ul className="list-group">
        {this.state.msgs.map(function(elem,index) {
          // console.log(elem);
          return (
            <SmallTalkLi index={index} highlight={highlight} highlighted={highlighted === index} text={elem}/>
          );
        })}
      </ul>
    );
  }
});

const SmallTalk = React.createClass({
  add() {
    var v = React.findDOMNode(this.refs.myText).value;
    this.refs.ul.push(v);
    this.props.new_msg(v)
    React.findDOMNode(this.refs.myText).value = "";
  },
  drop() {
    this.refs.ul.pop();
    this.props.new_msg("Item deleted!",true)
  },
  render() {
    var user = "PastLeo";
    return (
    <div className="panel panel-default">
      <div className="panel-heading">Hello {user}</div>
      <div className="panel-body">
        <textarea className="form-control" name="" id="" cols="30" rows="10" ref="myText" placeholder={this.props.placeholder}></textarea>
        <hr />
        <div className="btn-group" role="group" aria-label="...">
          <button className="btn btn-success" onClick={this.add}>Add</button>
          <button className="btn btn-danger" onClick={this.drop}>Drop</button>
        </div>
      </div>

      <SmallTalkUl ref="ul"></SmallTalkUl>
    </div>
    );
  }
});

module.exports = SmallTalk;
