import {ProductType} from "@/types";
import Image from "next/image";
import ProductInteraction from "@/components/ProductInteraction";

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

export const generateMetadata = async ({params}: {params: {id: string}}) => {
  return {
    title: product.name,
    description: product.description,
  }
}

const ProductPage = async ({searchParams, params}: Props) => {
  const {size, color} = await searchParams
  const selectedSize = (size || product.sizes[0] as string)
  const selectedColor = (color || product.colors[0] as string)
  return <div className={'flex flex-col gap-4 lg:flex-row md:gap-12'}>
    {/*IMAGE*/}
    <div className={'w-full lg:w-5/12 relative aspect-2/3'}>
      <Image
        src={product.images[selectedColor]}
        alt={product.name}
        fill
        className={'object-contain rounded-md'}
      />
    </div>
    {/* DETAILS */}
    <div className={'w-full lg:w-7/12 flex flex-col gap-4'}>
      <h1 className={'text-2xl font-medium'}>{product.name}</h1>
      <p className={'text-gray-500'}>{product.description}</p>
      <h2 className={'text-2xl font-medium'}>${product.price.toFixed(2)}</h2>
      <ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor}/>
      {/* CARD INFO */}
      <div className={'flex items-center gap-2 mt-4'}>
        <Image src={'/klarna.png'} alt={''} width={50} height={25} className={'rounded-md'}/>
        <Image src={'/cards.png'} alt={''} width={50} height={25} className={'rounded-md'}/>
        <Image src={'/stripe.png'} alt={''} width={50} height={25} className={'rounded-md'}/>
      </div>
    </div>
  </div>
}

export default ProductPage
