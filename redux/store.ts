import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../constants/localstorage";
import { cartReducer } from "./cart.slice";
import { UserReducer } from "./user.slice";

const reducer = {
  cart: cartReducer,
  user: UserReducer,
};

const persistedState:any = loadState();


const store = configureStore({
  reducer,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    user: store.getState().user
  });
});

export default store;