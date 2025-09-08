
"use server"


export async function getBrands() {

    try{
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
        const {data} = await res.json()
        return data
        

    }catch(err){
        return err
    }
    
}