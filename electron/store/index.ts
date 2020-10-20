import { createStore, combineReducers, applyMiddleware, AnyAction, Store } from 'redux';
import { IReduxStore } from './types';
import { resourcesReducer, subscriptionReducer } from './reducers';
import electronReduxMiddleware from './middleware';

export let store: Store<IReduxStore, AnyAction> & { dispatch: unknown };

const configureStore = () => {
    store = createStore(
        combineReducers<IReduxStore>({
            resources: resourcesReducer,
            subscriptions: subscriptionReducer
        }),
        applyMiddleware(electronReduxMiddleware)
    );

    return store;
};

export default configureStore;
