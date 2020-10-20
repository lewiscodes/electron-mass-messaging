"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSubscription = (subscription) => {
    return {
        type: 'SUBSCRIBE',
        subscription
    };
};
