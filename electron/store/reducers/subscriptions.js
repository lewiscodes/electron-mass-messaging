"use strict";
// import { IResourceState, IResourceAction } from '../types';
Object.defineProperty(exports, "__esModule", { value: true });
const defaultState = {
    items: []
};
const defaultAction = {
    type: '@@INIT'
};
exports.default = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case 'SUBSCRIBE':
            return Object.assign(Object.assign({}, state), { items: [...state.items, action.subscription] });
        default:
            return state;
    }
};
