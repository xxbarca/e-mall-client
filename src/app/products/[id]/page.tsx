import {ProductType} from "@/types";
import Image from "next/image";

const product: ProductType =  {
  id: 8,
  name: "Levi’s Classic Denim",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 59.9,
  sizes: ["s", "m", "l"],
  colors: ["blue", "green"],
  images: { blue: "/products/8b.png", green: "/products/8gr.png" },
}
interface Props {
  searchParams: Promise<{color: string; size: string;}>;
  params: Promise<{id: string}>
}
const ProductPage = async ({searchParams, params}: Props) => {
  const {size, color} = await searchParams
  const selectedSize = (size || product.sizes[0] as string)
  const selectedColor = (size || product.colors[0] as string)
  return <div className={'flex flex-col gap-4 lg:flex-row md:gap-12'}>
    {/*IMAGE*/}
    <div className={'w-full lg:w-5/12'}>
      <Image src={''} alt={''} />
    </div>
    {/* DETAILS */}
    <div className={'w-full lg:w-7/12'}></div>
  </div>
}

export default ProductPage
