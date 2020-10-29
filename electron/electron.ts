import electron, { ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';
import configureStore from './store';
import { setResources } from './store/actions/resources';
import { setSubscription, unsubscribe } from './store/actions/subscriptions';
import { IStore } from './store/types';
import { buildRouteLocation } from './utils';
import { generateResources, moveResources } from './utils/resources';
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const store: IStore = configureStore();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mapWindow: electron.BrowserWindow | null;
let listWindow: electron.BrowserWindow | null;

function createMapWindow() {
    // Create the browser window.
    mapWindow = new BrowserWindow({
        width: 1600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mapWindow.loadURL(buildRouteLocation('map'));

    // Open the DevTools.
    mapWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mapWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mapWindow = null
    })
}

function createListWindow() {
    
    // Create the browser window.
    listWindow = new BrowserWindow({
        width: 1600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    listWindow.loadURL(buildRouteLocation('resource'));

    // Open the DevTools.
    listWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    listWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        listWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    const resources = generateResources(1000);  
    store.dispatch(setResources(resources));
    createMapWindow();
    createListWindow();
    setInterval(() => {
        const newResources = moveResources(store.getState().resources.items);
        store.dispatch(setResources(newResources));
    }, 1000);
});

ipcMain.on('RESOURCES_SUBSCRIBE', (event: IpcMainEvent) => {
    store.dispatch(setSubscription({ subscriptionTo: 'SET_RESOURCES', subscriptionBy: event.sender.id }));
    event.reply('RESOURCES_SUBSCRIBE_RESPONSE', store.getState().resources);
});

ipcMain.on('UNSUBSCRIBE', (event: IpcMainEvent) => {
    store.dispatch(unsubscribe(event.sender.id));
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mapWindow === null) {
        createMapWindow()
    }

    if (listWindow === null) {
        createListWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.