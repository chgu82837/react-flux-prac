import React from 'react';
var AppStore = require('../stores/AppStore.js');
var AppActions = require('../actions/AppActions.js');

const PLItem = React.createClass({
  getInitialState() {
    return {selected: false};
  },

    ////////////////////////

  click() {
    AppActions.changeTarget(this.props.index);
  },
  dbClick() {
    AppActions.changeTarget(null);
    AppActions.deleteItemAt(this.props.index);
  },

    ////////////////////////

  targetChanged() {
    if(AppStore.getTarget() === this.props.index && this.state.selected === false)
      this.setState({selected:true});
    else if(AppStore.getTarget() !== this.props.index && this.state.selected === true)
      this.setState({selected:false});
  },
  componentWillMount() {
    AppStore.addChangeTargetListener(this.targetChanged);
  },
  componentWillUnmount() {
    AppStore.removeChangeTargetListener(this.targetChanged);
  },

    ////////////////////////

  render() {
    return (
      <tr className={this.state.selected ? "info" : ""} onClick={this.click} onDoubleClick={this.dbClick}>
        <td>{ this.props.index }</td>
        <td>{ this.props.email }</td>
        <td>{ this.props.name }</td>
        <td>{ this.props.text }</td>
      </tr>
    );
  }
});

const PLList = React.createClass({
  getInitialState() {
    return {items: AppStore.getItems()};
  },

    ////////////////////////

  itemChanged() {
    var items = AppStore.getItems();
    this.setState({items});
    /* ES6 feature
    var a = 1, b = 2;
    var obj = {a,b} // => obj = {a: 1,b: 2};
    */
  },
  componentWillMount() {
    AppStore.addChangeListener(this.itemChanged);
  },
  componentWillUnmount() {
    AppStore.removeChangeListener(this.itemChanged);
  },

    ////////////////////////

  render() {
    var self = this;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Name</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(function(elem,index) {
            return (
              <PLItem index={index} email={elem.email} name={elem.name} text={elem.text} />
            );
          })}
          {this.state.items.length ?
            (
              <tr className="warning">
                <td colSpan="4">Click to edit item, double click to delete item</td>
              </tr>
            ) : (
              <tr className="warning">
                <td colSpan="4">No Item</td>
              </tr>
          )}
        </tbody>
      </table>
    );
  }
});

module.exports = PLList;
