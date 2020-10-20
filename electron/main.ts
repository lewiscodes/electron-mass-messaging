import electron, { ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';
import configureStore from './store';
import { setResources } from './store/actions/resources';
import { setSubscription } from './store/actions/subscriptions';
import { IStore } from './store/types';
import { generateResources } from './utils/resources';
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const store: IStore = configureStore();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: electron.BrowserWindow | null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000/map');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    const resources = generateResources(1);
    store.dispatch(setResources(resources));
    createWindow();
    // let x = 2;
    // setInterval(() => {
    //     const newResources = generateResources(x);
    //     store.dispatch(setResources(newResources));
    //     x++;
    // }, 200);
});

ipcMain.on('RESOURCES_SUBSCRIBE', (event: IpcMainEvent) => {
    store.dispatch(setSubscription({ subscriptionTo: 'SET_RESOURCES', subscriptionBy: event.sender.id }));
    event.reply('RESOURCES_SUBSCRIBE_RESPONSE', store.getState().resources);
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
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.