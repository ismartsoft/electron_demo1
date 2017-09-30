//const app = require("app");
const { app, BrowserWindow, ipcMain, Menu } = require("electron");

let mainWindow;

const path = require('path');
const url = require('url');

var template = [{
    label: 'File',
    click: function () { 
        mainWindow.close();
        console.log("关闭");
    },
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }
    ]
}, {
    label: 'Edit',
    click: function () { 
        mainWindow.close();
        console.log("关闭");
    },
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }
    ]
}, {
    label: 'Selection',
    click: function () { 
        mainWindow.close();
        console.log("关闭");
    },
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }
    ]
}];
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        backgroundColor: "#333",
        //frame: false,
        //titleBarStyle: 'hiddenInset',
        //transparent: true
    });
    //mainWindow.setIgnoreMouseEvents(true)
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
/*
    document.getElementById("button1").addEventListener("click", (event) => {
        console.log("button clicked");
    })*/
});

ipcMain.on("hello", (event, arg) => {
    console.log('Hello, ', arg);
});

ipcMain.on("hello2", (event, arg) => {
    console.log('Hello, ', arg);
    ipcMain.emit("what1", "my name is funfun");
});

ipcMain.on("hello3", (event, arg) => {
    console.log('Hello, ', arg);
    mainWindow.close();
});
