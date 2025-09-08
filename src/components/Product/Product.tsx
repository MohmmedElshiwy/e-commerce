import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { ProductsType } from "@/types/products.type";
import Image from "next/image";
import ButtonAction from "../ButtonAction/ButtonAction";
import HeartBtn from "../HeartBtn/HeartBtn";

export default function Product({ product }: { product: ProductsType }) {
  // console.log(product);
  
  return (
    <Card className="gap-2 pb-0">
          <HeartBtn product={product}/>

      <Link href={`/products/${product.id}`}>
        <CardHeader>
          <CardTitle>
            <Image
              width={500}
              height={500}
              src={product.imageCover}
              alt={product.title}
            />
          </CardTitle>
          <CardDescription className="text-xl text-main">
            {product.category.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-lg font-semibold text-gray-500 line-clamp-1">
          {product.title}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-xl font-bold">
            <span>Price </span> : {product.price}
          </p>
          <p className="text-yellow-500 text-xl "> {product.ratingsAverage}</p>
        </CardFooter>
      </Link>
    <ButtonAction id= {product.id}/>
    </Card>
  );
}
