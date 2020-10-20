import { Store, AnyAction } from 'redux';
import { IResourceState } from '../../../globalTypes/resources';

export interface IReduxStore {
    readonly resources: IResourceState;
};

export type IStore = Store<IReduxStore, AnyAction> & { dispatch: unknown }