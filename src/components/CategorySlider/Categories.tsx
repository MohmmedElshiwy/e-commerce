import React from 'react'
import { allCategories } from '@/api/categoirs';
import Category from "./Category"

export default async  function Categories() {

 const data = await  allCategories();
 
    
  return (
<Category data={data}/>
  )
}
