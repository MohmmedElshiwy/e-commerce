// src/api/categories.ts
"use server"

import { CategoryType } from "@/types/category.type";


export async function allCategories(): Promise<CategoryType[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const { data } = await res.json();
  return data;
}

