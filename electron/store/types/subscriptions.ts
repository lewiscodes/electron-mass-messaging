export interface ISubscriptionState {
    readonly items: ISubscription[];
};

export interface ISubscriptionAction {
    type: '@@INIT' | 'SUBSCRIBE';
    subscription?: ISubscription;
};

export interface ISubscription {
    readonly subscriptionTo: string;
    readonly subscriptionBy: number;
};