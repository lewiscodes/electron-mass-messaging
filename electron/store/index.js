"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const reducers_1 = require("./reducers");
const middleware_1 = __importDefault(require("./middleware"));
const configureStore = () => {
    exports.store = redux_1.createStore(redux_1.combineReducers({
        resources: reducers_1.resourcesReducer,
        subscriptions: reducers_1.subscriptionReducer
    }), redux_1.applyMiddleware(middleware_1.default));
    return exports.store;
};
exports.default = configureStore;
