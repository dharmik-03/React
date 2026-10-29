import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "../feature/CounterSlice";


const store = configureStore({
    reducer: {
        counter: counterSlice
    }
})


export default store