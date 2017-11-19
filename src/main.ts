import * as electron from 'electron';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;

import * as path from 'path';
import * as url from 'url';

let mainWindow;
let addItemWindow;

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
    let newWindow = new BrowserWindow({
        width: 900,
        height: 600,
        backgroundColor: '#555',
        //frame: false,
        //titleBarStyle: 'hiddenInset',
        //transparent: true
    });
    mainWindow = newWindow;
    newWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'app/index3.html'),
			protocol: 'file:',
			slashes: true
		}));
    // Quit when mainWindow closed
    newWindow.on('closed', () => {
		app.quit();
	});

    //mainWindow.toggleDevTools();

    // Create main menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
    mainMenu.items[0].label = 'MyApp';

    /*
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
*/
    //
    ipcMain.on('hello2', (event: string, arg: string) => {
        console.log('Hello, ', arg);
        ipcMain.emit('what1', 'my name is funfun');
    });

    ipcMain.on('hello3', (event: string, arg: string) => {
        console.log('Hello, ', arg);
        mainWindow.close();
    });
}

function createAddItemWindow() {
    addItemWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Add Item'
    });
    addItemWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/additem.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit when mainWindow closed
    addItemWindow.on('closed', () => {
        addItemWindow = null;
    });
}

//
app.on('ready', () => {
    createWindow();
    //
});

function keysBinding(name) {
    return name;
}

// Create main menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item', click() {
                    if (addItemWindow) {
                        addItemWindow.visible = true;
                    } else {
                        createAddItemWindow();
                    }
                },
            },
            { 
                label: "About Application",
                selector: "orderFrontStandardAboutPanel:"
            },
            {
                label: "Quit",
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() { app.quit(); }
            }
        ]
    }, {
        label: keysBinding["Edit"],
        submenu: [
            { label: keysBinding["Undo"], accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: keysBinding["Redo"], accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { label: keysBinding["Cut"], accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: keysBinding["Copy"], accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: keysBinding["Paste"], accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: keysBinding["Select All"], accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }
];

// If Mac, insert empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({ label: '', submenu: [] });
}

// Add developer tools item if not in production
/*if (process.env.NODE_ENV != 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [ 
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I'//,
                //click: toggleDevTools
            },
            {
                role: 'reload'
            }
        ]
    });
}*/

function toggleDevTools(item, focusedWindow) {
    focusedWindow.toggleDevTools();
}