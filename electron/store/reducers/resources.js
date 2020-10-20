"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultState = {
    items: []
};
const defaultAction = {
    type: '@@INIT'
};
exports.default = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case 'SET_RESOURCES':
            return Object.assign(Object.assign({}, state), { items: action.resources });
        default:
            return state;
    }
};
