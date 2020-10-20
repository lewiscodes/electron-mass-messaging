import { IResource } from "../types"

export const setResources = (resources: IResource[]) => {
    return {
        type: 'SET_RESOURCES',
        resources
    }
}