import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductsFromServer, sortProducts } from '../redux/reducers/products'
import { setSortToggle } from '../redux/reducers/settings'
import ProductCard from './product-card'

const Products = () => {
  const productsList = useSelector((s) => s.products.list)
  const { sort } = useSelector((s) => s.settings)
  const dispatch = useDispatch()

  const sortByType = (sortType) => {
    return () => {
      dispatch(setSortToggle(sortType))
      dispatch(sortProducts(sortType, sort[sortType]))
    }
  }

  useEffect(() => {
    dispatch(getProductsFromServer())
  }, [dispatch])

  return (
    <>
      <div className="flex justify-end p-4">
        <div className="flex justify-between p-4 rounded-lg gap-x-4 button-group">
          <button
            type="button"
            className={`flex text-white font-semibold btn-sort ${
              sort.name ? 'sort-up' : 'sort-down'
            }`}
            onClick={sortByType('name')}
          >
            Name <span className="ml-1">&#9660;</span>
          </button>
          <button
            type="button"
            className={`flex text-white font-semibold btn-sort ${
              sort.price ? 'sort-up' : 'sort-down'
            }`}
            onClick={sortByType('price')}
          >
            Price <span className="ml-1">&#9660;</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-y-4 p-4 products shadow-xl rounded-lg">
        {Object.values(productsList).map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </>
  )
}

export default Products
