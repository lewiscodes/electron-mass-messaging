"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
exports.electronReduxMiddleware = store => next => action => {
    // const stateBeforeAction = store.getState();
    const result = next(action);
    // const stateAfterAction = store.getState();
    if (action.type !== 'SUBSCRIBE') {
        pushDataToSubscriptions(store, action.type);
    }
    return result;
};
const pushDataToSubscriptions = (store, actionType) => {
    const subscriptions = store.getState().subscriptions.items;
    if (subscriptions.length) {
        const windowsToSendTo = subscriptions
            .filter(subscription => subscription.subscriptionTo === actionType)
            .map(subscription => subscription.subscriptionBy);
        windowsToSendTo.forEach(windowId => {
            electron_1.webContents.fromId(windowId).send('RESOURCES_UPDATE', getReducerFromAction(store, actionType));
        });
    }
};
const getReducerFromAction = (store, actionType) => {
    const reduxState = store.getState();
    switch (actionType) {
        case 'SET_RESOURCES':
            return reduxState.resources;
        default:
            throw new Error('Action isnt associated with a reducer!');
    }
};
