function authorsBuilding(authors){
    if(authors == null || authors == undefined) return ""
    let authorName = []
    authorName.push(authors[0].name)
    for(let i = 1; i < authors.length; i++){
        authorName.push(", ")
        authorName.push(authors[i].name)
    }

    return authorName.join("")
}

export {authorsBuilding}