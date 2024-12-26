import { Button } from "@/components/ui/button";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowLeftIcon, StarIcon, MinusIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  addToCart,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { productDetails } = useSelector((state) => state.shopProducts);

  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

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
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleOpenDescription = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="list-item-text-3 bg-[#252525] text-white">
      <div className="flex flex-col justify-center  md:flex-row p-7 gap-7">
        <div className="flex gap-1 p-3  h-fit">
          <ArrowLeftIcon className="h-6 w-6 text-[#D72B7E]" />
        </div>
        <div className="flex flex-1 py-4 px-4 gap-2 justify-center ">
          {/* <div className="flex flex-col w-fit gap-3 xl:gap-7">
            Basically these spans are just placeholder
            <span className="h-[3.5rem] w-[3.5rem] lg:w-[5rem]  lg:h-[5rem] xl:w-[7rem]  xl:h-[7rem] bg-white"></span>
            <span className="h-[3.5rem] w-[3.5rem] lg:w-[5rem]  lg:h-[5rem] xl:w-[7rem]  xl:h-[7rem] bg-white"></span>
            <span className="h-[3.5rem] w-[3.5rem] lg:w-[5rem]  lg:h-[5rem] xl:w-[7rem]  xl:h-[7rem] bg-white"></span>
           
          </div> */}

          {/* <div className="h-[15rem] ">
            <img
              className="h-[12rem] w-[12rem] lg:min-h-[20rem]  lg:min-w-[20rem]  "
              src={productDetails?.image}
              alt=""
            />
          </div> */}
          <div>
            <img src={productDetails?.image} alt="" />
          </div>
        </div>

        {/* The div with the details page */}
        <div className="flex flex-col gap-2 md:gap-4 px-4 py-4 flex-1">
          <div className="text-white md:text-lg  lg:text-2xl">
            {productDetails?.name}
          </div>
          <div className="flex gap-1 text-white">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          {/* Stock availabilty */}
          <div>
            <span>
              <h4 className="list-item-text-3 md:text-lg lg:text-2xl">
                Availabilty: {productDetails?.stock} products are currently
                available
              </h4>
            </span>
          </div>
          {/* Quantity */}

          <div className="flex items-center gap-4">
            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddtoCart(productDetails?._id)}
              className=" w-[7rem] h-[3rem] bg-black text-white border border-pink-500 rounded-md hover:bg-pink-500 hover:text-black"
            >
              Add to cart
            </button>
          </div>

          {/* buy now */}
          <div className="w-full">
            <button className="p-2 w-full  rounded bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] ">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* This div is basically the description div */}
      <div
        className="flex gap-2  items-center justify-start md:justify-end p-7 lg:text-3xl "
        onClick={handleOpenDescription}
      >
        <h3>Description</h3>
        <MdOutlineKeyboardArrowDown />
      </div>
    </main>
  );
};

export default ProductDetails;
