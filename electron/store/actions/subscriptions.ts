import { ISubscription } from "../../../types/subscriptions"

export const setSubscription = (subscription: ISubscription) => {
    return {
        type: 'SUBSCRIBE',
        subscription
    }
}