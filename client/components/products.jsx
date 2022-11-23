import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductsFromServer } from '../redux/reducers/products'
import ProductCard from './product-card'

const Products = () => {
  const productsList = useSelector((s) => s.products.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsFromServer())
  }, [])

  return (
    <div className="flex justify-between flex-wrap gap-y-4 p-4 products shadow-xl rounded-lg">
      {Object.values(productsList).map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  )
}

export default Products
