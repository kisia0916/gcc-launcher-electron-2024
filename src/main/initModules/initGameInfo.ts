import fs from "fs"

const main = ()=>{
    const path = `${process.cwd().replaceAll("\\","/")}/launcher-game/games`
    const dirs= fs.readdirSync(path)
    const launcherMetaInfoIndex = 2
    fs.appendFileSync("./game_info.json","{")
    fs.appendFileSync("./game_info.json",`"genres":["action","command","shooting","table","other"],`)
    dirs.forEach((i,index)=>{
        const GenreName = i
        const games = fs.readdirSync(`${path}/${i}`)
        fs.appendFileSync("./game_info.json",`"${i}":[`)
            games.forEach((k,index2)=>{
                const files = fs.readdirSync(`${path}/${i}/${k}`)
                let thumbnailImg = "none"
                const launcher_meta = fs.readFileSync(`${path}/${i}/${k}/launcher_meta.txt`,'utf8')
                files.forEach((m)=>{
                    const contents = m.split(".")
                    if (contents[0] == "thumbnail"){
                        thumbnailImg = `${path}/${GenreName}/${k}/${contents[0]}.${contents[1]}`
                    }
                })
                const metaSplitList = launcher_meta.split("\r\n")
                let gameTitle:string = ""
                if (metaSplitList[0]){
                    gameTitle = metaSplitList[0]
                }else{
                    gameTitle = k
                }
                const mainFilePlace = `${path}/${i}/${k}/${metaSplitList[1]}`
                const projectType = metaSplitList[2]
                let readme = ""
                metaSplitList.forEach((i,index)=>{
                    if (index > launcherMetaInfoIndex){
                        readme+=`${i}\r\n`
                    }
                })
                const writeData = {
                    genre:GenreName,
                    title:gameTitle,
                    place:mainFilePlace,
                    thumbnail:thumbnailImg,
                    readme:readme,
                    project_type:projectType,
                    diff:"hard"
                }
                console.log(writeData)
                index2 == games.length-1 ?fs.appendFileSync("./game_info.json",`${JSON.stringify(writeData)}\n`):fs.appendFileSync("./game_info.json",`${JSON.stringify(writeData)},\n`)
            })
        index == dirs.length-1?fs.appendFileSync("./game_info.json",`]`):fs.appendFileSync("./game_info.json",`],`)
})
fs.appendFileSync("./game_info.json","}")
console.log(path)

}

export const generateGameJson = ()=>{
    if (!fs.existsSync("./game_info.json")){
        main()
    }
}