import { IResource } from "../../../types/resources"

export const setResources = (resources: IResource[]) => {
    return {
        type: 'SET_RESOURCES',
        resources
    }
}