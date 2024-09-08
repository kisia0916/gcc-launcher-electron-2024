import { BrowserWindow, ipcMain ,screen} from "electron";
import fs from "fs"
import child_process from "child_process"
const { v4: uuidv4 } = require('uuid')
import { resolveHtmlPath } from '../util';

const GAME_INFO_PATH = "./game_info.json"
interface processInterface  {id:string,process:any,closeButtonWindow:any}
let running_process_list:processInterface[] = []
export const ipcModules = (ipcMain:any)=>{
    ipcMain.on('load-games-data',(event:any,arg:any)=>{
        const gameDataJson = JSON.parse(fs.readFileSync(GAME_INFO_PATH,"utf-8"))
        event.sender.send("load-games-data",gameDataJson)
    })
    ipcMain.on("run_game",(event:any,arg:any)=>{
        const cmd = `${arg.game_path}`
        const processId = uuidv4()
        const {width,height} = screen.getPrimaryDisplay().workAreaSize
        running_process_list.forEach((i:processInterface)=>{
            i.closeButtonWindow.destroy()
        })
        const new_process = child_process.spawn(cmd)
        const allCloseButtonWindow = new BrowserWindow({
            frame:false,
            transparent:true,
            width:55,
            height:55,
            x:width-80,
            y:10,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
        })
        running_process_list = [...running_process_list,{id:processId as string,process:new_process,closeButtonWindow:allCloseButtonWindow}]
        allCloseButtonWindow.loadFile("./CloseButton/CloseButton.html")
        allCloseButtonWindow.setAlwaysOnTop(true)
        new_process.on("close",()=>{
            event.sender.send("close-game-process","")
            running_process_list.forEach((i:processInterface)=>{
                i.process.kill()
            })
            allCloseButtonWindow.destroy()
            running_process_list = []
        })
        ipcMain.on("close_process",(event:any,arg:any)=>{
            running_process_list.forEach((i:processInterface)=>{
                i.process.kill()
            })
            running_process_list = []
            allCloseButtonWindow.destroy()
        })
    })
}
