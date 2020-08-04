export default async function(options) {
    let request
    if (sessionStorage.token) {
        options.header.authorization = `Bearer ${sessionStorage.token}`
    }
    try {
        request = await fetch(options);
    } catch(e) {
        console.log('fetch error:', e)
    }
    const answer = await request.json();
    return answer 
    
}