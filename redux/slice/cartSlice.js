'use client'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = getState().userInfo.user

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const obj = {
        userId: user._id || null,
      }

      const { data } = await axios.post('api/cart/find', obj, config)

      // Return data

      localStorage.setItem('cart', JSON.stringify(data))

      return data
    } catch (error) {
      // If there's an error, reject the promise with the error value
      console.log('fetchCart dispatch error:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState()
      const user = state.userInfo.user
      const cart = state.cart.cart

      // For guest users, handle locally
      const updatedItems = cart.items.map((item) =>
        item.product === product
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )

      // If the product is not already in the cart, add it
      if (!cart.items.some((item) => item.product === product)) {
        updatedItems.push({ product, quantity })
      }

      const updatedCart = { ...cart, items: updatedItems }

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      // Update Redux state
      dispatch(setCart(updatedCart))

      // If user is logged in, sync with backend
      if (user !== null) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        await axios.post(`/api/cart/update`, { cart: updatedCart }, config)
      }

      return updatedCart
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const setQty = createAsyncThunk(
  'cart/setQty',
  async ({ product, quantity }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState()
      const user = state.userInfo.user
      const cart = state.cart.cart

      // For guest users, handle locally
      const updatedItems = cart.items.map((item) =>
        item.product === product ? { ...item, quantity: quantity } : item
      )

      // If the product is not already in the cart, add it
      if (!cart.items.some((item) => item.product === product)) {
        updatedItems.push({ product, quantity })
      }

      const updatedCart = { ...cart, items: updatedItems }

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      // Update Redux state
      dispatch(setCart(updatedCart))

      // If user is logged in, sync with backend
      if (user !== null) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        await axios.post(`/api/cart/update`, { cart: updatedCart }, config)
      }

      return updatedCart
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ product }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState()
      const user = state.userInfo.user
      const cart = state.cart.cart

      // For guest users, handle locally
      let updatedItems = cart.items
        .map((item) =>
          item.product === product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity <= 0

      const updatedCart = { ...cart, items: updatedItems }

      // Update local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      // Update Redux state
      dispatch(setCart(updatedCart))

      // If user is logged in, sync with backend
      if (user !== null) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        await axios.post(`/api/cart/update`, { cart: updatedCart }, config)
      }

      return updatedCart
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const initialState = {
  cart: null,
  loading: false,
  error: null,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
      localStorage.setItem('cart', JSON.stringify(action.payload))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.error
      })
  },
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart
