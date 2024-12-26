import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/pages/shopping-view/ProductTileShopping";
import ProductTileShop from "@/pages/shopping-view/ProductTileShop";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const Cartview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const {user} = useSelector((state)=> state.auth)
  const { productList } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [sort, setSort] = useState("price-low-high"); // Set default sort option
  const {toast} = useToast();


  console.log(cartItems, "cart");

  // Handle sorting change
  const handleSort = (value) => {
    setSort(value);
  };

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items
          .reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.sales > 0
                ? currentItem?.sales
                : currentItem?.price) *
                currentItem?.quantity,
            0
          )
          .toLocaleString()
      : 0;

  const handleNavigate = () => {
    navigate("/shop/all-products");
  };

  const handleCheckoutNavigate = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty, please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    navigate("/shop/checkout");
  };

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`); // Navigate to the product detail page
    console.log(`Navigating to: /product/${getCurrentProductId}`);
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title : "Product is added to cart",
        })
      }
    });
  }

  // Fetch products for the "couples" category on initial load and on sort change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category: "", sort, limit: 4 }));
  }, [dispatch, sort]);

  return (
    <div className="p-2 lg:p-7 xl:px-[7rem] bg-[#252525]">
      <div
        onClick={handleNavigate}
        className="flex gap-1 p-3  h-fit items-center  text-[#D72B7E] text-sm lg:text-lg lg:font-semibold"
      >
        <ArrowLeftIcon className="h-4 w-4  lg:h-6 lg:w-6 " />
        <h3>Continue Shopping</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-2 justify-center ">
        <div className="flex-1 flex gap-2   items-center ">
          <CartContent
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </div>
        <div className="flex-1 text-white bg-black py-8 px-2 h-fit">
          <div className="py-2">
            <span>Cart Summary</span>
          </div>

          <div className="border-y flex flex-col gap-2 py-8">
            <div className=" flex justify-between">
              <span>Subtotal</span>
              <span> ₦ {totalCartAmount}</span>
            </div>

            <span>Shipping</span>
            <span>DisCounts</span>
          </div>

          <div className="mt-5 flex justify-between">
            <span>Total </span>
            <span> ₦ {totalCartAmount}</span>
          </div>

          {/*  */}

          <div className="relative">
            <span>
              <input
                className="w-full xl:w-[70%] px-3 py-3 bg-black border mt-6 rounded text-sm "
                placeholder="Enter Coupon Code"
              />
            </span>

            <button className="px-4 py-1 rounded-xl absolute right-3 xl:right-[15rem] top-[1.9rem] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">
              Apply
            </button>
          </div>

          {/* checkout button */}
          <div className="mt-4">
            <button
              onClick={handleCheckoutNavigate}
              className="w-full bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] px-5 py-2 rounded-xl"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* This is the second section of the page */}
      <div className="mt-10 flex flex-col justify-center items-center text-white">
        <h2>YOU MAY ALSO LIKE</h2>
        <div>
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 ">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  // <ShoppingProductTile
                  //   key={index}
                  //   product={productItem}
                  //   handleGetProductDetails={handleGetProductDetails}
                  // />

                  <ProductTileShop
                  key={index}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
                ))
              : null}
          </div>
        </div>
      </div>

      {/* second */}
      <div className="mt-10 flex flex-col justify-center items-center text-white">
        <h2>YOU MAY ALSO LIKE</h2>
        <div>
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 ">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                     // <ShoppingProductTile
                  //   key={index}
                  //   product={productItem}
                  //   handleGetProductDetails={handleGetProductDetails}
                  // />

                  <ProductTileShop
                  key={index}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartview;
