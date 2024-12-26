import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MinusIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const CartContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleNavigate = () => {
    navigate("/shop/all-products");
  };

  const totalItems =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload.success) {
        toast({ title: "Cart item is updated successfully" });
      }
    });
  };

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload.success) {
        toast({ title: "Cart item is deleted successfully" });
      }
    });
  };

  return (
    <div className="bg-black py-8 px-2 w-full">
      <div className="text-white px-2  flex gap-1">
        <h3>Cart</h3>
        <span>({totalItems})</span>
      </div>
      <div className="mt-5 ">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId}>
              {/* My full stop */}
              <div >
                <div className=" flex gap-2 border-t py-8 px-2 items-center ">
                  <span>
                    <img
                      className="w-20 h-20 xl:w-28 xl:h-28 rounded object-cover"
                      src={item?.image}
                      alt={item?.name}
                    />
                  </span>
                  <div className="flex justify-between w-[75%]">
                    <span className="flex flex-col gap-2">
                      <h3 className="text-white text-sm xl:text-lg">{item?.name}</h3>
                      <p className="text-white xl:text-lg">
                        ₦
                        {(
                          (item?.sales > 0 ? item?.sales : item?.price) *
                          item?.quantity
                        )
                          .toFixed(2)
                          .toLocaleString()}
                      </p>

                      <span className="flex items-center gap-2 xl:gap-3 mt-1">
                        <Button
                          variant="outline"
                          className="w-4 h-4 xl:w-7 xl:h-7 bg-[#7BB1FC] hover:bg-[#1A79FF]"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item, "minus")}
                          disabled={item?.quantity === 1}
                        >
                          <MinusIcon className=" bg-[#7BB1FC] hover:bg-[#1A79FF]" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="text-white text-lg">{item?.quantity}</span>
                        <Button
                          variant="outline"
                          className="w-4 h-4 xl:w-7 xl:h-7 bg-[#7BB1FC] hover:bg-[#1A79FF]"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item, "plus")}
                        >
                          <Plus className="w-4 h-4 " />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </span>
                    </span>
                    <span>
                      <MdOutlineDeleteForever
                        onClick={() => handleCartItemDelete(item)}
                        className="text-[#D72B7E]"
                      />
                    </span>
                  </div>
                </div>
                
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="bg-black flex flex-col justify-center items-center px-4 py-5 md:p-10 text-center gap-4">
              <img
                className="h-[5.5rem] w-[5.5rem] md:h-[7.5rem] md:w-[7.5rem] xl:h-[10.5rem] xl:w-[10.5rem]"
                src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1733091847/Mern-Ecommerce/f7_cart-fill_t0cknz.png"
                alt="Cart-Basket"
              />

              <div className="flex flex-col justify-center items-center text-white p-2">
                <h3 className="lg:text-2xl xl:text-3xl xl:font-semibold">
                  Your Cart is empty
                </h3>
                <p className="lg:text-lg xl:text-xl ">
                  Browse our categories and discover our best deals
                </p>
              </div>
              <div>
                <button
                  onClick={handleNavigate}
                  className="px-8 py-3 w-full rounded-lg bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContent;
