import { configureStore } from "@reduxjs/toolkit";

import InventorySlice from "../feature/InventorySlice";


const store = configureStore({
    reducer: {
        inventory:InventorySlice
    }
})


export default store