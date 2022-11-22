
// // The app module, which controls our application's event lifecycle.
// // The BrowserWindow module, which creates and manages application windows.
// const { app, BrowserWindow } = require('electron');

// // createWindow() function that loads index.html into a new BrowserWindow instance
// const createWindow = () => {
//    const win = new BrowserWindow({
//         width: 800,
//         height: 600
//     })
//     win.loadFile('../src/index.html')
// }


// // In Electron, browser windows can only be created after the app module's ready event is fired. You can wait for this event by using the app.whenReady() API. Call createWindow() after whenReady() resolves its Promise.
// app.whenReady().then(() => {
//     createWindow()
//   })