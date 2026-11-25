import productSlice from "../features/productSlice";
import {configureStore} from "@reduxjs/toolkit"


const store = configureStore({

    reducer: {
        product: productSlice
    }
})

export default store