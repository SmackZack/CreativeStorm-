import axios from 'axios'
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from '../constants/wishlistConstants'

export const addToWishList = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            description: data.description,
            rating: data.rating,
            numReviews: data.numReviews
        },
    })

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

export const removeFormWishList = (id) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}