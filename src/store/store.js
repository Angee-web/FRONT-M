//Firstly i need to install redux toolkit and react-redux
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import therapistsReducer from "./therapy/therapist-slice";
import questionnaireReducer from "./therapy/question-slice";
import scheduleReducer from "./therapy/schedule-slice";

import adminProductsSlice from "./admin/products-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice/index";
import shopOrderSlice from "./shop/order/index";
import adminOrderSlice from "./admin/order-slice/index";

// This store will be created on global reducer and it will hold all the application state
// And I will be using redux toolkit to create the store and all the slices which will entail a lot of slices e.g AuthSlice, AdminSlice, ShoppingSlice, etc
// So basically this is my doc for the store and all the slices

const store = configureStore({
  reducer: {
    // This is where i added all the slices
    auth: authReducer,

    therapists: therapistsReducer,
    questionnaire: questionnaireReducer,
    schedule: scheduleReducer,

    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    adminOrder: adminOrderSlice,
  },
});

export default store;
// This is the store that i will be using in the main.jsx file
