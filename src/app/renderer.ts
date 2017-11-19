import * as electron from 'electron';

const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;

let button1 = document.getElementById('button1');
if (button1) {
    button1.addEventListener('click', () => {
        console.log("hello button1");
        ipcRenderer.send("hello", "what the fuck");
        document.head.title = "Hi here!";
    })
}

let button2 = document.getElementById('button2');
if (button2) {
    button2.addEventListener('click', () => {
        console.log("hello button2");
        ipcRenderer.send("hello2", "what the fuck 2");
    })
}

let button3 = document.getElementById('button3');
if (button3) {
    button3.addEventListener('click', () => {
        ipcRenderer.send("hello3", "button3 clicked");
    })
}

ipcRenderer.on("what1", function () {
    console.log("what1 on!");
});

let navBarBrand = document.getElementById('navbar-brand');
if (navBarBrand) {
    navBarBrand.addEventListener('click', () => {
        console.log('Brand clicked!');
    })
}
