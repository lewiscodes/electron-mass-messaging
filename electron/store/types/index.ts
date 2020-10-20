import { Store, AnyAction } from 'redux';
import { IResourceState } from '../../../globalTypes/resources';
import { ISubscriptionState } from './subscriptions';

export interface IReduxStore {
    readonly resources: IResourceState;
    readonly subscriptions: ISubscriptionState;
};

export type IStore = Store<IReduxStore, AnyAction> & { dispatch: unknown }