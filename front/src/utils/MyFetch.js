const defaultOptions = {
    headers: {'Content-Type': 'application/json'}
}

export default async function(url, options) {
    const newOptions = Object.assign(defaultOptions, options)
    let request
    if (sessionStorage.token) {
        newOptions.headers.authorization = 'Bearer ' + sessionStorage.token
    }
    try {
        request = await fetch(url, newOptions);
        return request
    } catch(e) {
        console.log('fetch error:', e)
    }
}
