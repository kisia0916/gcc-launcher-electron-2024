import { ipcMain } from "electron";
import fs from "fs"

const GAME_INFO_PATH = "./game_info.json"
export const ipcModules = (ipcMain:any)=>{
    ipcMain.on('load-games-data',async(event:any,arg:any)=>{
        const gameInfoJson = JSON.parse(fs.readFileSync(GAME_INFO_PATH,'utf8'))
        event.sender.send("load-games-data",gameInfoJson)
    })
}
