import { ISubscriptionAction, ISubscriptionState } from "../types/subscriptions";

const defaultState: ISubscriptionState = {
    items: []
};

const defaultAction: ISubscriptionAction = {
    type: '@@INIT'
};

export default (state: ISubscriptionState = defaultState, action: ISubscriptionAction = defaultAction): ISubscriptionState => {
    switch (action.type) {
        case 'SUBSCRIBE':
            return {
                ...state,
                items: [ ...state.items, action.subscription! ]
            };
        case 'UNSUBSCRIBE':
            return {
                ...state,
                items: state.items.filter(item => item.subscriptionBy !== action.windowId)
            }
    default:
        return state;
    }
};
