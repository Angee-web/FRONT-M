import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ShoppingLayout from "./Layout";
import ShoppingHome from "./Home";
import ShoppingListing from "./Listing";
import ShoppingCheckout from "./Checkout";
import ShoppingAccount from "./Account";
import Nav2 from "@/components/navbar/Nav2";
import ForMen from "@/components/shopping/ForMen";
import ForWomen from "@/components/shopping/ForWomen";
import ForCouples from "@/components/shopping/ForCouples";
import AllProducts from "@/components/shopping/AllProducts";
import Footer from "@/components/footer/Footer";
import ProductDetails from "@/components/shopping/productDetails/ProductDetails";
import Cartview from "@/components/cart/Cartview";
import ShopAbout from "./ShopAbout";
import AddressAccount from "@/components/shopping/address/Address-account";

import AdminOrders from "../admin-view/Orders";
import ShoppingOrder from "./ShoppingOrder";
import PaystackReturnPage from "@/components/shopping/paystack/PaystackReturnPage";
import PaymentSuccess from "@/components/shopping/paystack/PaymentSuccess";

const Shopping = () => {
  return (
    <div>
      <Nav2/>
        <Routes>

          {/* <Route path="/" element={<Navigate to="/shop/shopping-Layout" />} /> */}

          <Route path="/" element={<Navigate to="/shop/home" />} />

          <Route path="/shopping-Layout" element={<ShoppingLayout />} />
          <Route path="/home" element={<ShoppingHome />} />
          <Route path="/listing" element={<ShoppingListing />} />
          <Route path="/checkout" element={<ShoppingCheckout />} />
          <Route path="/account" element={<ShoppingAccount />} />
          <Route path="/for-men" element={<ForMen />} />
          <Route path="/for-women" element={<ForWomen />} />
          <Route path="/for-couple" element={<ForCouples/>} />
          <Route path="/all-products" element={<AllProducts/>} />
          <Route path="/cart" element={<Cartview/>} />
          <Route path = "/product/:id" element={<ProductDetails/>} />
          <Route path = "/about" element={<ShopAbout/>} />
          <Route path = "/account/address" element={<AddressAccount/>} />
          <Route path ="/shopping-order" element={<ShoppingOrder/>}/>
          <Route path ="/paystack-confirmation" element={<PaystackReturnPage/>}/>
          <Route path ="/payment-success" element={<PaymentSuccess/>}/>
          <Route />
          <Route />
        </Routes>
      {/* </ShoppingLayout> */}
      <Footer/>
    </div>
  );
};

export default Shopping;
