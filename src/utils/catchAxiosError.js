function catchAxiosError(error) {
    const message = error.response ? error.response?.data?.message : error?.message
    // const statusText = error.response && error.response?.data?.statusText
    // const newError = new Error(message)
    // newError.statusText = statusText
    return message
}

export default catchAxiosError
