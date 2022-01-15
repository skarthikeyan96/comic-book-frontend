import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";
import { UserReducer } from "./user.slice";

const reducer = {
  cart: cartReducer,
  user: UserReducer,
};

const store = configureStore({
  reducer,
});

export default store;