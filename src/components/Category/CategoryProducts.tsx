"use client";

import { allCategories } from "@/api/categoirs";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Loading from "@/app/products/loading";

export default function CategoryProducts() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    try {
      const data = await allCategories();
      setCategories(data);
    } catch (err) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = selectedCategory
    ? categories.filter((cat) => cat._id === selectedCategory)
    : categories;

  if (loading) return <Loading />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Choose a Category</h1>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded-lg p-2 w-full max-w-sm mb-8"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.map((cat) => (
          <Card key={cat._id} className="flex flex-col h-full py-0 pb-4">
            <CardHeader className="flex-1 p-0">
              <div className="relative w-full h-64">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-4">{cat.name}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href={`#`}>
                <Button className="w-full">View</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
