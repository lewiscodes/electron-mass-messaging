import { IResource } from "../types/resources";

export const setResources = (resources: IResource[]) => {
    const allowedSecurityLevel = 2;
    const filteredResources = resources.filter(resource => resource.securityLevel <= allowedSecurityLevel);
    
    return {
        type: 'SET_RESOURCES',
        resources: filteredResources
    }
}