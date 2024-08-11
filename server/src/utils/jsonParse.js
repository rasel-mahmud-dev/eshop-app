function jsonParse(str = "") {
    return new Promise((resolve) => {
        try {
            const data = JSON.parse(str)
            console.log(data, str)
            resolve(data)
        } catch (ex) {
            resolve(null)
        }
    })
}

export default jsonParse