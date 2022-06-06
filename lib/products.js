export async function fetchProductPaths(){
    let paths = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/products/get-paths`).then( async (res)=> {
        res = await res.json()
        return res
    }).catch(err => console.log(err))

    return paths.map(item => {
        return {
            params:{
                product: item
            }
        }
    });
}

export async function fetchProducts(){
    let products = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/products/get-all`).then( async (res)=> {
        res = await res.json()
        return res
    }).catch(err => console.log(err))
    
    return products;
}

export async function fetchProduct(pathname){

    let product = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/products/get/${pathname}`).then( async (res)=> {
        res = await res.json()
        return res
    }).catch(err => console.log(err))

    return product

}