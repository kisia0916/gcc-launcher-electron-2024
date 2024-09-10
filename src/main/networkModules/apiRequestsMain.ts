import axiosMain, { AxiosResponse } from "axios"
import fs from "fs"

const networkInfoFile:{server_address:string,basic_auth_user:string,basic_auth_pass:string} = JSON.parse(fs.readFileSync("./network_info.json","utf-8"))
const axios = axiosMain.create({
    auth:{
        username:networkInfoFile.basic_auth_user,
        password:networkInfoFile.basic_auth_pass
    }
})
export const apiRequestMain = (ipcMain:any)=>{
    // const gameInfo = JSON.parse(fs.readFileSync(`"${process.cwd()}/game_info.json"`,"utf-8"))
    ipcMain.on("get-genre-ranking-request",(event:any,arg:any)=>{
        console.log(`${networkInfoFile.server_address}/ranking/get-genre-ranking`)
        axios.post(`${networkInfoFile.server_address}/ranking/get-genre-ranking`,{
            genres:["action","command"]
        }).then((res:AxiosResponse)=>{
            event.sender.send("get-genre-ranking-response",{data:res.data})
        }).catch((error)=>{
            console.log(error)
            event.sender.send("get-genre-ranking-response",{data:"server-error"})
        })
    })
    ipcMain.on("get-all-view-counter-request",(event:any,arg:any)=>{
        axios.post(`${networkInfoFile.server_address}/game/get-all-view-counter`,{
            genres:arg.genres
        }).then((res:AxiosResponse)=>{
            event.sender.send("get-all-view-counter-response",{data:res.data})
        }).catch((error)=>{
            event.sender.send("get-all-view-counter-response",{data:"server-error"})
        })
    })
    ipcMain.on("set-visitor-request",(event:any,arg:any)=>{
        axios.post(`${networkInfoFile.server_address}/game/get-all-view-counter`,{
            genres:arg.genres
        }).then((res:AxiosResponse)=>{
            event.sender.send("get-all-view-counter-response",{data:res.data})
        }).catch((error)=>{
            event.sender.send("get-all-view-counter-response",{data:"server-error"})
        })
    })
}