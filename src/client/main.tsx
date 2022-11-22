const { BrowserWindow, app } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        // webPreferences: {
        //     // nodeItegration: false,
        //     worldSafeExecuteJavascript: true,
        //     contextIsolation: true
        // }
    })
    win.loadFile('./src/client/index.html');
}

app.whenReady().then(createWindow)