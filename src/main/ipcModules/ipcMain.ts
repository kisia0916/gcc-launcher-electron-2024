import { ipcMain } from "electron";
import fs from "fs"
// import {exec, execSync} from "child_process"

const GAME_INFO_PATH = "./game_info.json"
export const ipcModules = (ipcMain:any)=>{
    ipcMain.on('load-games-data',(event:any,arg:any)=>{
        const gameDataJson = JSON.parse(fs.readFileSync(GAME_INFO_PATH,"utf-8"))
        event.sender.send("load-games-data",gameDataJson)
    })
    ipcMain.on("run_game",(event:any,arg:any)=>{
        // execSync("")
    })
}
