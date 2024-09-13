import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import userRegisterReducer from './features/user/userRegisterSlice'
import categoryReducer from './features/category/categorySlice'
import createCategoryReducer from './features/category/createCategorySlice'
import createProductReducer from './features/products/createProductSlice'
import listProductReducer from './features/products/listProductSlice'
import getCategoryReducer from './features/category/getCategorySlice'
import editCategoryReducer from './features/category/editCategorySlice'
import getProductReducer from './features/products/getProductSlice'
import editProductReducer from './features/products/editProductSlice'
import getCartReducer from './features/cart/cartSlice'
import cartProductsReducer from './features/cart/cartProductsSlice'
import addCartReducer from './features/cart/addCartSlice'

export default configureStore({
  reducer: {
    userInfo: userReducer,
    userRegister: userRegisterReducer,
    getCategory: getCategoryReducer,
    categoryList: categoryReducer,
    editCategory: editCategoryReducer,
    createCategory: createCategoryReducer,
    getProduct: getProductReducer,
    editProduct: editProductReducer,
    productCreate: createProductReducer,
    productList: listProductReducer,
    cart: getCartReducer,
    cartProducts: cartProductsReducer,
    addCart: addCartReducer,
  },
})
