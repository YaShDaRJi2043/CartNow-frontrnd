// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state, action) => {
      state.cartCount += action.payload || 1;
    },
    decrementCart: (state, action) => {
      const qty = action.payload || 1;
      state.cartCount = Math.max(state.cartCount - qty, 0); // avoid negative
    },
    resetCart: (state) => {
      state.cartCount = 0;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload; // Set the cart count from the API
    },
  },
});

export const { incrementCart, decrementCart, resetCart, setCartCount } =
  cartSlice.actions;

export default cartSlice.reducer;
