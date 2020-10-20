"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importStar(require("electron"));
const store_1 = __importDefault(require("./store"));
const resources_1 = require("./store/actions/resources");
const subscriptions_1 = require("./store/actions/subscriptions");
const resources_2 = require("./utils/resources");
// Module to control application life.
const app = electron_1.default.app;
// Module to create native browser window.
const BrowserWindow = electron_1.default.BrowserWindow;
const store = store_1.default();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
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
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    const resources = resources_2.generateResources(1);
    store.dispatch(resources_1.setResources(resources));
    createWindow();
    // let x = 2;
    // setInterval(() => {
    //     const newResources = generateResources(x);
    //     store.dispatch(setResources(newResources));
    //     x++;
    // }, 200);
});
electron_1.ipcMain.on('RESOURCES_SUBSCRIBE', (event) => {
    store.dispatch(subscriptions_1.setSubscription({ subscriptionTo: 'SET_RESOURCES', subscriptionBy: event.sender.id }));
    event.reply('RESOURCES_SUBSCRIBE_RESPONSE', store.getState().resources);
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
