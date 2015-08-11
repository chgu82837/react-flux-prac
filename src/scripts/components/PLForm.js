import React from 'react';
var _ = require('underscore');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');

const PLForm = React.createClass({
  getInitialState() {
    return {'email': null, 'name': null, 'text': null, 'index': null};
  },

  ////////////////////////

  cancel() {
    AppActions.changeTarget(null);
  },

  change(event) {
    // this.state[event.target.id] = event.target.value;
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },
  click() {
    console.log(this.state);

    if(this.state.index === null)
      AppActions.addItem(this.state);
    else
      AppActions.editItemAt(this.state.index,this.state);

    var r = _.reduce(
      _.map(
        this.state,
        function(ele,k){
          return `${k}: ${ele}`
        }
      ),
      function(r,ele){
        return r + ele + ", ";
      },
      ""
    );
    // console.log(r);
    this.props.submit(r);
    this.setState({
      'email': null,
      'name': null,
      'text': null,
      'index': null
    });
  },

  ////////////////////////

  targetChanged() {
    var index = AppStore.getTarget();
    var newState;
    if(index !== null){
      newState = AppStore.getItem(index);
      newState.index = index;
    }
    else{
      newState = {'email': null, 'name': null, 'text': null, 'index': null};
    }
    this.setState(newState);
  },
  componentWillMount() {
    AppStore.addChangeTargetListener(this.targetChanged);
  },
  componentWillUnmount() {
    AppStore.removeChangeTargetListener(this.targetChanged);
  },

  ////////////////////////

  render() {
    var sumbitAct = this.state.index === null ? "Add Item" : "Edit";
    return <div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type="text" id='email' name='email'
          className='form-control'
          onChange={this.change}
          value={this.state.email} />
      </div>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type="text" id='name' name='name'
          className='form-control'
          onChange={this.change}
          value={this.state.name} />
      </div>
      <div className='form-group'>
        <label htmlFor='text'>Text</label>
        <input type="text" id='text' name='text'
          className='form-control'
          onChange={this.change}
          value={this.state.text} />
      </div>
      <div className='form-group'>
        <button onClick={this.click} className='btn btn-success'>
          { this.state.index === null ? "Add Item" : "Edit" }
        </button>
        { this.state.index === null ? "" : (
          <button className="btn btn-warning pull-right" onClick={this.cancel}>Cancel</button>
          ) }
      </div>
    </div>;
  }
});

module.exports = PLForm;
