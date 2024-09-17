import fs from "fs"

export const get_timer_info = (ipcMain:any)=>{
    const timerNum = JSON.parse(fs.readFileSync("./launcher-settings.json","utf-8")).timer as number
    ipcMain.on("get-timer-info",(event:any,arg:any)=>{
        console.log(timerNum)
        event.sender.send("get-timer-info",timerNum)
    })
}