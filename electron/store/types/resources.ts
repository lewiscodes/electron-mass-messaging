export interface IResourceState {
    readonly items: IResource[];
};

export interface IResourceAction {
    type: '@@INIT' | 'SET_RESOURCES';
    resources?: IResource[];
};

export interface IResource {
    readonly id: number;
    readonly cs: string;
    readonly ct: string;
    readonly type: string;
    readonly status: string;
    readonly location: number[];
    readonly travelTime: string;
    readonly eta: string;
    readonly distance: string;
    readonly station: string;
};