function getToken(req){
    let result = ""
    let token = req.headers["authorization"]  || ""
    if(token){
        result = token.split(" ")[1]
    }
    return result
}

export default getToken