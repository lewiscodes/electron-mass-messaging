import isDev from 'electron-is-dev';
import path from 'path';

export const buildRouteLocation = (route: string): string => {
    if (isDev) {
        return `http://localhost:3000/${route}`;
    }

    return `file://${path.join(__dirname, '../../build/index.html')}`
}