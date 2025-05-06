import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth_slice'
import { adminProductsReducer } from "./admin/Products";


const store = configureStore({
    reducer:{
        auth : authReducer,
        adminProducts: adminProductsReducer,
    }
});

export default store;