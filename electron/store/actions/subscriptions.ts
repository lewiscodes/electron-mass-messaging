import { ISubscription } from "../types/subscriptions";

export const setSubscription = (subscription: ISubscription) => {
    return {
        type: 'SUBSCRIBE',
        subscription
    }
}

export const unsubscribe = (windowId: number) => {
    return {
        type: 'UNSUBSCRIBE',
        windowId
    }
}