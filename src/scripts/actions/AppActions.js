var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var AppActions = {
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ADD_ITEM,
      item: item
    });
  },

  deleteItemAt(index) {
    AppDispatcher.dispatch({
      actionType: AppConstants.REMOVE_ITEM_AT,
      index: index
    });
  },
  editItemAt(index, item) {
    AppDispatcher.dispatch({
      actionType: AppConstants.EDIT_ITEM_AT,
      index: index,
      item: item
    });
  },
  changeTarget(index) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_EDIT_TARGET,
      index: index
    })
  }
};
module.exports = AppActions;
