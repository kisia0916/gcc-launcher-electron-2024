import axiosMain, { AxiosResponse } from "axios"
import fs from "fs"

const networkInfoFile:{server_address:string,basic_auth_user:string,basic_auth_pass:string} = JSON.parse(fs.readFileSync("./launcher-settings.json","utf-8")).network_info
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
        let rankingData = undefined
        let viewData = undefined
        try{
            rankingData = await axios.post(`${networkInfoFile.server_address}/ranking/get-genre-ranking`,{
                genres:arg.genres
            },{timeout:5000})
            viewData = await axios.post(`${networkInfoFile.server_address}/game/get-all-view-counter`,{
                genres:arg.genres
            },{timeout:5000})
        }catch{
            console.log("axios timeout")
        }
        event.sender.send("send-init-response",{ranking:rankingData?.data,view:viewData?.data})
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
        axios.put(`${networkInfoFile.server_address}/visitor/add-visitor`,{
            title:"main",
            add:arg.num as number
        },{timeout:5000}).then((res:AxiosResponse)=>{
           event.sender.send("set-visitor-response",{data:res.data})
        }).catch((error)=>{
            const nowOfflineVisitor = fs.readFileSync("./visitor.txt","utf-8")
            const nextNumber = nowOfflineVisitor as unknown as number + 1
            event.sender.send("set-visitor-response",{data:"server-error"})
        })
    })
}