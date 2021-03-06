import axios from 'axios'
import omit from 'lodash/omit'
import history from '../../history'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const QUANTITY_UPDATE = 'QUANTITY_UPDATE'


/**
 * ACTION CREATORS
 */
export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    id
  }
}

export function clearCart() {
  return {
    type: CLEAR_CART
  }
}

export function updateQuantity(value, id) {
  return {
    type: QUANTITY_UPDATE,
    value,
    id
  }
}


/**
 * REDUCER
 */
export default function (state = { items: {} }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return addItemToCart(state, action.product)
    case REMOVE_FROM_CART:
      return removeItemFromCart(state, action.id)
    case QUANTITY_UPDATE:
      return updateQuantityForItem(state, action.value, action.id)
    case CLEAR_CART:
      return {
        items: {}
      }
    default:
      return state
  }
}

function addItemToCart(cart, product) {
  if (cart.items[product.id]) {
    const { quantity, ...rest } = cart.items[product.id]
    return {
      ...cart,
      items: {
        ...cart.items, [product.id]: { quantity: quantity + 1, ...rest }
      }
    }
  }
  const { name, image, price } = product
  return {
    ...cart,
    items: {
      ...cart.items,
      [product.id]: {
        quantity: 1,
        name,
        image,
        price
      }
    }
  }
}

function removeItemFromCart(cart, id) {
  return { ...cart, items: omit(cart.items, id) }
}

function updateQuantityForItem(cart, value, id) {
  return {
    ...cart,
    items: {
      ...cart.items,
      [id]: {
        ...cart.items[id],
        // We need to cast it because the redux store expects a number.
        quantity: +value
      }
    }
  }
}

/**
 * THUNK CREATORS
 */
export const checkoutCart = (items, checkoutForm) => dispatch => {
    axios.post('/api/orders', { items, checkoutForm })
      .then(res => res.data)
      .then(() => {
        history.push('/products')
        dispatch(clearCart())
      })
      .catch(err => console.log(err))
}
