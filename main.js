const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
require('./app/updater');

let isDev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
	isDev = true;
}

let indexPath;
let mainWindow;
function createWindow(){
    if(isDev){
        indexPath = url.format({
            protocol:'http',
            host:'localhost:8080',
            pathname:'index.html',
            slashes:true
        });
    }else{
        indexPath = url.format({
            protocol:'file',
			pathname:path.join(__dirname,'dist','index.html'),
			slashes:true
        })
    }
    
    mainWindow = new BrowserWindow({width:800, height:600, show:false});
    mainWindow.loadURL(indexPath);

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    })
    mainWindow.once('ready-to-show', ()=>{
        mainWindow.show();
    })
}

app.on('ready', createWindow);
app.on('activate', ()=>{
    if(mainWindow === null){
        createWindow()
    }
})
app.on('window-all-closed', ()=>{
    app.quit();
})