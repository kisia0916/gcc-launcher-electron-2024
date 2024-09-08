import fs from "fs"

const main = ()=>{
    const path = `${process.cwd().replaceAll("\\","/")}/launcher-game/games`
    const dirs= fs.readdirSync(path)
    fs.appendFileSync("./game_info.json","{")
    fs.appendFileSync("./game_info.json",`"genres":["Latest","Action","Command","Shooting","Table","Other"],`)
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
                const gameTitle = metaSplitList[0]
                const mainFilePlace = `${path}/${i}/${k}/${metaSplitList[1]}`
                let readme = ""
                metaSplitList.forEach((i,index)=>{
                    if (index > 1){
                        readme+=`${i}\r\n`
                    }
                })
                const writeData = {
                    genre:GenreName,
                    title:gameTitle,
                    place:mainFilePlace,
                    thumbnail:thumbnailImg,
                    readme:readme
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