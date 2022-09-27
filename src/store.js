import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Todo/todoSlice";
const store = configureStore({
    reducer:{
        todo : todoSlice.reducer
    }
})

export default store;