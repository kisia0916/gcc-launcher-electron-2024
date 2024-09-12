import { BrowserWindow, ipcMain ,screen} from "electron";
import fs from "fs"
import child_process from "child_process"
import axios from "axios";
import { add_view_counter } from "../networkModules/apiRequestsMain";

const GAME_INFO_PATH = "./game_info.json"
interface processInterface  {id:string,process:any}
let running_process_list:processInterface[] = []
export const ipcModules = (ipcMain:any)=>{
    ipcMain.on('load-games-data',(event:any,arg:any)=>{
        const gameDataJson = JSON.parse(fs.readFileSync(GAME_INFO_PATH,"utf-8"))
        event.sender.send("load-games-data",gameDataJson)
    })
    ipcMain.on("run_game",(event:any,arg:any)=>{
        running_process_list.forEach((i:processInterface)=>{
            i.process.kill()
        })
        const cmd = `${arg.game_path}`
        const processId = arg.processId
        const new_process = child_process.spawn(cmd)
        running_process_list = [...running_process_list,{id:processId as string,process:new_process}]
        new_process.on("close",()=>{
            event.sender.send("close-game-process",{processId:processId,project_type:"exe"})
            const targetIndex = running_process_list.findIndex((i:processInterface)=>i.id === processId)
            if (targetIndex !== -1){
                running_process_list.splice(targetIndex,1)
            }
        })
    })
    ipcMain.on("close-game-process",(event:any,arg:any)=>{
        event.sender.send("close-game-process",{processId:"",project_type:arg.project_type})
    })
    ipcMain.on("select-genre",(event:any,arg:any)=>{
        event.sender.send("select-genre",{genre:arg.genre})
    })
}
