import { configureStore } from "@reduxjs/toolkit";
import favouritereducer from "./favouriteslice"

const store=configureStore({
    reducer:{

        favourite:favouritereducer,
    }
})
export default store