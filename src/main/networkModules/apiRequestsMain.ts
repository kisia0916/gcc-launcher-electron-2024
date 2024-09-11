import axiosMain, { AxiosResponse } from "axios"
import fs from "fs"

const networkInfoFile:{server_address:string,basic_auth_user:string,basic_auth_pass:string} = JSON.parse(fs.readFileSync("./network_info.json","utf-8"))
const axios = axiosMain.create({
    auth:{
        username:networkInfoFile.basic_auth_user,
        password:networkInfoFile.basic_auth_pass
    }
})

export const add_view_counter = (title:string,ipcMain:any)=>{
    axios.post(`${networkInfoFile.server_address}/game/add-view-counter`,{
        title:title
    }).then((res:AxiosResponse)=>{
        ipcMain.sender.send("add-view-counter-response",{data:res.data})
    }).catch((error)=>{
        ipcMain.sender.send("add-view-counter-response",{data:"server-error"})
    })
}

export const apiRequestMain = (ipcMain:any)=>{
    // const gameInfo = JSON.parse(fs.readFileSync(`"${process.cwd()}/game_info.json"`,"utf-8"))
    ipcMain.on("send-init-request",async(event:any,arg:any)=>{
        console.log(`${networkInfoFile.server_address}/ranking/get-genre-ranking`)
        const rankingData = await axios.post(`${networkInfoFile.server_address}/ranking/get-genre-ranking`,{
            genres:arg.genres
        })
        const viewData = await axios.post(`${networkInfoFile.server_address}/game/get-all-view-counter`,{
            genres:arg.genres
        })
        event.sender.send("send-init-response",{ranking:rankingData.data,view:viewData.data})
    })
    ipcMain.on("add-view-counter-request",(event:any,arg:any)=>{
        axios.put(`${networkInfoFile.server_address}/game/add-view-counter`,{
            title:arg.title
        }).then((res:AxiosResponse)=>{
            event.sender.send("add-view-counter-response",{data:res.data})
        }).catch((error)=>{
            event.sender.send("add-view-counter-response",{data:"server-error"})
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