'use client'

import {ProductType} from "@/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Minus, Plus, ShoppingCart} from "lucide-react";
import {useState} from "react";
import useCartStore from "@/stores/cartStore";
import {toast} from "react-toastify";

interface Props {
  product: ProductType
  selectedSize: string
  selectedColor: string
}

const ProductInteraction = ({product, selectedColor, selectedSize}: Props) => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [quantity, setQuantity] = useState(1)

  const {addToCart} = useCartStore()

  const handleQuantityChange = (type: 'decrement' | 'increment') => {
    if (type === 'increment') {
      setQuantity(pre => pre + 1)
    } else {
      if (quantity > 1) {
        setQuantity(pre => pre - 1)
      }
    }
  }

  const handleTypeChange = (type: string , value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(type, value)
    router.push(`${pathname}?${params.toString()}`, {scroll: false})
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize
    })
    toast.success('Product added to cart successfully.')
  }

  return <div className={'flex flex-col gap-4 mt-4'}>
    <div className={'flex flex-col gap-2 text-xs'}>
      <span className={'text-gray-500'}>Size</span>
      <div className={'flex items-center gap-2'}>
        {product.sizes.map(size => (
          <div
            className={`cursor-pointer border p-0.5 ${
              selectedSize === size ? 'border-gray-600' : 'border-gray-300'
            }`}
            key={size}
            onClick={() => handleTypeChange('size', size)}
          >
            <div
              className={`w-6 h-6 text-center flex items-center justify-center ${
                selectedSize === size ? "bg-black text-white" : "bg-white text-black"
              }`}
            >{size.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
    <div className={'flex flex-col gap-2 text-sm'}>
      <span className={'text-gray-500'}>Size</span>
      <div className={'flex items-center gap-2'}>
        {product.colors.map(color => (
          <div
            className={`cursor-pointer border p-0.5 ${
              selectedColor === color ? 'border-gray-300' : 'border-white'
            }`}
            key={color}
            onClick={() => handleTypeChange('color', color)}
          >
            <div
              className={`w-6 h-6`}
              style={{backgroundColor: color}}
            />
          </div>
        ))}
      </div>
    </div>
    <div className={'flex flex-col gap-2 text-sm'}>
      <span className={'text-gray-500'}>Quantity</span>
      <div className={'flex items-center gap-2'}>
        <button className={'cursor-pointer border border-gray-300 p-1'}>
          <Minus className={'w-4 h-4'} onClick={() => handleQuantityChange('decrement')}/>
        </button>
        <span>{quantity}</span>
        <button className={'cursor-pointer border border-gray-300 p-1'}>
          <Plus className={'w-4 h-4'}  onClick={() => handleQuantityChange('increment')}/>
        </button>
      </div>
    </div>
    {/* BUTTONS */}
    <button
      onClick={handleAddToCart}
      className={'bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium'}
    >
      <Plus className={'w-4 h-4'}/>
      Add to Cart
    </button>
    <button className={'ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer text-sm font-medium'}>
      <ShoppingCart className={'w-4 h-4'}/>
      Buy this Item
    </button>
  </div>
}

export default ProductInteraction;