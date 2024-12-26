import Address from "@/components/shopping/address/Address";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShoppingAccount = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

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

  return (
    <div className="p-2 lg:p-7 xl:px-[5rem] bg-[#252525]">
      <div
        onClick={handleNavigate}
        className="flex gap-1 py-3 w-fit h-fit items-center  text-[#D72B7E] text-sm lg:text-lg lg:font-semibold px-2 mb-4"
      >
        <ArrowLeftIcon className="h-4 w-4  lg:h-6 lg:w-6 " />
        <h3>Continue Shopping</h3>
      </div>
      <div className="flex flex-col  md:flex-row gap-5 justify-between ">
        <div className="flex-1 ">
          <Address />
        </div>

        {/* Second main div */}
        <div className="flex-1 text-white bg-black py-8 px-2 lg:px-6 h-fit">
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

         
          <div className="mt-4">
            <button className="w-full bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] px-5 py-2 rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
