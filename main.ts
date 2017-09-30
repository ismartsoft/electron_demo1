
import { app, BrowserWindow, ipcMain } from 'electron';

const path = require('path');
const url = require('url');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        backgroundColor: '#333'
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
