import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";
import { rickAndMortySlice } from "./slices/rickAndMorty"

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    rickAndMorty: rickAndMortySlice.reducer,
  }
})