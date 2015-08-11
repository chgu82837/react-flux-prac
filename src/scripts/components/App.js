import React from 'react';
var SmallTalk = require('./SmallTalk.js');
var PLForm = require('./PLForm.js');
var PLList = require('./PLList.js');

const Notification = React.createClass({
  getInitialState() {
    return {msg: false};
  },
  notify(msg,isFail = false) {
    this.setState({msg:msg,isFail:isFail});
  },
  render() {
    var cn = "alert alert-";
    cn += this.state.isFail ? 'danger' : 'success';
    return this.state.msg ? (
      <div className="row">
        <h2>Message:</h2>
        <div className={cn} role="alert">{this.state.msg}</div>
      </div>
    ) : (
      <div className="row"></div>
    )
  }
});
const App = React.createClass({
  notify(msg,isFail = false) {
    this.refs.noti.notify(msg,isFail);
  },

  render() {

    var hint = "INPUT SOMETHING!!!!!";
    var codeBlockStyle = { "fontFamily": "monospace",
                           "backgroundColor": "#D0D0D0" };
    return (
    <div>
      <header>
        <h1>react</h1>
        <h3>A React/Flux app generate by RF, powered with Babel</h3>
      </header>
      <article className="context">
        <p>
          Greeting form <a href="https://github.com/taiansu/generator-rf">RF generator</a>.
        </p>

        <p>
          Remember you are powered with <a href="https://gaearon.github.io/react-hot-loader/">react-hot-loader</a> now. Edit this file in <span style={ codeBlockStyle }>src/scripts/components/App.js</span> and save it, it will auto reload the page for you.
        </p>

        <Notification ref="noti"></Notification>
        <SmallTalk placeholder={hint} new_msg={this.notify}></SmallTalk>
        <div className="col-xs-12 col-md-6">
          <PLForm submit={this.notify}></PLForm>
        </div>
        <div className="col-xs-12 col-md-6">
          <PLList></PLList>
        </div>
      </article>
    </div>
    );
  }
});

module.exports = App;
