
var { ipcMain, ipcRenderer } = require("electron")

document.getElementById('button1').addEventListener('click', () => {
    console.log("hello button1");
    ipcRenderer.send("hello", "what the fuck");
    
    document.head.title = "Hi here!";
});

document.getElementById('button2').addEventListener('click', () => {
    console.log("hello button2");
    ipcRenderer.send("hello2", "what the fuck 2");
});

document.getElementById("button3").addEventListener('click', () => {
    ipcRenderer.send("hello3", "button3 clicked");
});

ipcRenderer.on("what1", () => {
    console.log("what1 on!");
})
