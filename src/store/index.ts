import { createStore, combineReducers, applyMiddleware, compose, AnyAction, Store } from 'redux';
import { IReduxStore } from './types';
import { resourcesReduer } from './reducers';

declare global {
    interface Window { // eslint-disable-line @typescript-eslint/interface-name-prefix
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}

let composeEnhancers: typeof compose = compose;

if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
export let store: Store<IReduxStore, AnyAction> & { dispatch: unknown };

const configureStore = (): Store<IReduxStore> => {
    store = createStore(
        combineReducers<IReduxStore>({
            resources: resourcesReduer
        }),
        composeEnhancers(applyMiddleware())
    );

    return store;
};

export default configureStore;
