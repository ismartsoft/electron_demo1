
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;

const path = require('path');
const url = require('url');

let mainWindow;
    
// 
var template = [{
    label: 'File',
    click: () => {
        console.log('关闭');
    },
    submenu: [{ 
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }]
}, {
    label: 'Edit',
    click: () => {
        console.log('编辑');
    },
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }]
}, {
    label: 'Selection',
    click: () => {
        console.log('选择');
    },
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }]
}];

//
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        backgroundColor: '#333',
        //frame: false,
        //titleBarStyle: 'hiddenInset',
        //transparent: true
    });
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
}

//
app.on('ready', () => {
    createWindow();
    //
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
 
//
ipcMain.on('hello2', (event: string, arg: string) => {
    console.log('Hello, ', arg);
    ipcMain.emit('what1', 'my name is funfun');
});

ipcMain.on('hello3', (event: string, arg: string) => {
    console.log('Hello, ', arg);
    mainWindow.close();
})