export async function userFetcher (url){

    const cookies = document.cookie.split("; ")

    const accessToken = cookies.filter((ck)=> ck.includes("accessToken"))[0].replace("accessToken=","")
    const refreshToken = cookies.filter((ck)=> ck.includes("refreshToken"))[0].replace("refreshToken=","")

    const response = await fetch(url, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'authorization':`Bearer ${accessToken}`
        }
    }).then( async res => {
        return await res.json()
    })

    return response

}