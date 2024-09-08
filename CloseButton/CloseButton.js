const {ipcRenderer} = require("electron")
const closeProcess = ()=>{
    ipcRenderer.send("close_process","")
}