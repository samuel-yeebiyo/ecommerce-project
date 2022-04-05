export async function fetchProductPaths(){
    let paths = await fetch('http://localhost:8000/shops/get-paths').then( async (res)=> {
        res = await res.json()
        return res
    }).catch(err => console.log(err))

    return paths.map(item => {
        return {
            params:{
                shop: item
            }
        }
    });
}

export async function fetchShop(pathname){

    let shop = await fetch(`http://localhost:8000/shops/get/${pathname}`).then( async (res)=> {
        res = await res.json()
        return res
    }).catch(err => console.log(err))

    return shop

}