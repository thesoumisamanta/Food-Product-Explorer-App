import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        wishlistItems: JSON.parse(localStorage.getItem('wishlistItems')) || [],
        flashMessage: null,
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            state.flashMessage = 'Product added to cart'
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            state.flashMessage = 'Product removed from cart'
        },

        addToWishlist: (state, action) => {
            state.wishlistItems.push(action.payload);
            localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems))
            state.flashMessage = 'Product added to wishlist'
        },

        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload)
            localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems))
            state.flashMessage = 'Product removed from wishlist'
        },

        clearFlashMessage: (state) => {
            state.flashMessage = null
        }
    }
})

export const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, clearFlashMessage } = cartSlice.actions

export default cartSlice.reducer