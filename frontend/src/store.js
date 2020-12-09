import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { wishlistReducer } from './reducers/wishlistReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     cart: cartReducer,
     wishlist: wishlistReducer,
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     userDetails: userDetailsReducer,
     userUpdateProfile: userUpdateProfileReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
     ? JSON.parse(localStorage.getItem('cartItems'))
     : []

const wishlistItemsFromStorage = localStorage.getItem('wishlistItems')
     ? JSON.parse(localStorage.getItem('wishlistItems'))
     : []

const userInfoFromStorage = localStorage.getItem('userInfo')
     ? JSON.parse(localStorage.getItem('userInfo'))
     : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
     ? JSON.parse(localStorage.getItem('shippingAddress'))
     : null

const initialState = {
     cart: { cartItems: cartItemsFromStorage,
     shippingAddress:shippingAddressFromStorage },
     wishlist: { wishlistItems: wishlistItemsFromStorage },
     userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;