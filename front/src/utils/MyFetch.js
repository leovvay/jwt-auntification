const defaultOptions = {
    headers: {'Content-Type': 'application/json'}
}

export default async function(url, options) {
    const newOptions = Object.assign(defaultOptions, options)
    let request
    if (sessionStorage.token) {
        const token = sessionStorage.token[0] ==='"' ? JSON.parse(sessionStorage.token) : sessionStorage.token
        newOptions.headers.authorization = `Bearer ${token}`;
    }
    try {
        request = await fetch(url, newOptions);
        return request
    } catch(e) {
        // needed during development
        console.log('fetch error:', e)
    }
}
