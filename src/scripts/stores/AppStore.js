var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppConstants = require('../constants/AppConstants.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var CHANGE_EVENT = 'CHANGE';
var CHANGE_EDIT_EVENT = 'CHANGE_EDIT';

var _itemlist = [];
var editing = null;

var AppStore = assign(new EventEmitter(),{

    getItems(){
        return _itemlist;
    },
    getItem(index){
        return _itemlist[index];
    },
    changeTarget(index){
        editing = index;
    },
    getTarget(){
        return editing;
    },
    addItem(item) {
        _itemlist.push(item);
    },
    editItemAt(i,item) {
        _itemlist[i] = item;
    },
    deleteItemAt(i) {
        _itemlist.splice(i,1);
    },

    ////////////////////////////////////
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    addChangeTargetListener(callback){
        this.on(CHANGE_EDIT_EVENT, callback);
    },
    removeChangeTargetListener(callback){
        this.removeListener(CHANGE_EDIT_EVENT, callback);
    },
});

AppDispatcher.register(function(payload){
    switch(payload.actionType){
        case AppConstants.ADD_ITEM:
            AppStore.addItem(payload.item); break;
        case AppConstants.EDIT_ITEM_AT:
            AppStore.editItemAt(payload.index,payload.item); break;
        case AppConstants.REMOVE_ITEM_AT:
            AppStore.deleteItemAt(payload.index); break;
        case AppConstants.CHANGE_EDIT_TARGET:
            AppStore.changeTarget(payload.index); break;
        default:
            return false;
    }
    switch(payload.actionType){
        case AppConstants.ADD_ITEM:
        case AppConstants.EDIT_ITEM_AT:
        case AppConstants.REMOVE_ITEM_AT:
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CHANGE_EDIT_TARGET:
            AppStore.emit(CHANGE_EDIT_EVENT);
            break;
        default:
            return false;
    }
    return true;
});

module.exports = AppStore;
