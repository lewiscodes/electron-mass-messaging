import { IResourceState, IResourceAction } from '../types/resources';

const defaultState: IResourceState = {
    items: []
};

const defaultAction: IResourceAction = {
    type: '@@INIT'
};

export default (state: IResourceState = defaultState, action: IResourceAction = defaultAction): IResourceState => {
    switch (action.type) {
    case 'SET_RESOURCES':
        return {
            ...state,
            items: action.resources!
        };
    default:
        return state;
    }
};
