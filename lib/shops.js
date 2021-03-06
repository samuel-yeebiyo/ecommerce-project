export async function fetchShopPaths(){
    let paths = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/shops/get-paths`).then( async (res)=> {
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

    let shop = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/shops/get/${pathname}`).then( async (res)=> {
        res = await res.json()
        return res
    }).catch(err => console.log(err))

    return shop

}