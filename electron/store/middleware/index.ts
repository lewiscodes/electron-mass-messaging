import { webContents } from 'electron';
import { AnyAction } from 'redux';
import { IStore } from '../types'

export default (store: IStore) => (next: Function) => (action: AnyAction) => {
    // const stateBeforeAction = store.getState();
    const result = next(action)
    // const stateAfterAction = store.getState();
    if (action.type !== 'SUBSCRIBE') {
        pushDataToSubscriptions(store, action.type);
    }
    return result
};

const pushDataToSubscriptions = (store: IStore, actionType: string) => {
    const subscriptions = store.getState().subscriptions.items;
    if (subscriptions.length) {
        const windowsToSendTo = subscriptions
            .filter(subscription => subscription.subscriptionTo === actionType)
            .map(subscription => subscription.subscriptionBy);
        windowsToSendTo.forEach(windowId => {
            webContents.fromId(windowId).send('RESOURCES_UPDATE', getReducerFromAction(store, actionType));
        })
    }
}

const getReducerFromAction = (store: IStore, actionType: string) => {
    const reduxState = store.getState();

    switch (actionType) {
        case 'SET_RESOURCES':
            return reduxState.resources;            
        default:
            throw new Error('Action isnt associated with a reducer!')
    }
}