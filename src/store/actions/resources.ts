import { IResource } from "../../../globalTypes/resources"

export const setResources = (resources: IResource[]) => {
    return {
        type: 'SET_RESOURCES',
        resources
    }
}