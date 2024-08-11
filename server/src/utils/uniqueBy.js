
// function uniqueBy<T>(arr: Array<T>, cb: (arg: T) => any) {

function uniqueBy(arr, cb) {
    if (!arr || !Array.isArray(arr)) return []
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (result.findIndex(item => cb(item) === cb(arr[i])) === -1) {
            result.push(arr[i])
        }
    }
    return result
}

export default uniqueBy
