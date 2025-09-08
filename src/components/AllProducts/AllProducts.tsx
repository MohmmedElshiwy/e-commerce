import Product from '../Product/Product'
import { getProducts } from '@/api/product.api'
import { ProductsType } from '@/types/products.type'

export default async function AllProducts() {
      const  data =await getProducts()


  return (
<>
<div className="flex flex-col my-10">
<h3 className='my-5 text-center'>Products</h3>
 <div className='flex flex-wrap gap-2 w-full  '>
  {
  data.map( (p:ProductsType)=> <div className='md:w-1/4 w-full lg:w-1/5 my-5 m-auto' key={p.id}>

    <Product product={p}/>
  </div>)}
 </div> 
</div>

</>
 )
}
