export interface ISubscriptionState {
    readonly items: ISubscription[];
};

export interface ISubscriptionAction {
    type: '@@INIT' | 'SUBSCRIBE' | 'UNSUBSCRIBE';
    subscription?: ISubscription;
    windowId?: number;
};

export interface ISubscription {
    readonly subscriptionTo: string;
    readonly subscriptionBy: number;
};