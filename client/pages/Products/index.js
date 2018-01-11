import React from 'react'
import { connect } from 'react-redux'
import { Product } from '../../components'
import './style.css'

const Products = ({ products, location }) => {
  const categoryId = new URLSearchParams(location.search).get('category')
  const search = new URLSearchParams(location.search).get('search')

  const filteredProducts = categoryId ?
    products.filter(product => product.categories.includes(Number(categoryId))) : products

  return (
    <div id="products-wrapper">
      <div id="category-filter-wrapper">
        <CategoryFilter />
      </div>
      <div id="products">
        {
          filteredProducts.map(product => (
            <Product key={product.id} name={product.name} image={product.image} />
          ))
        }
      </div>
    </div>
  )
}

const mapState = ({ products }) => ({
  products
})

export default connect(mapState)(Products)
