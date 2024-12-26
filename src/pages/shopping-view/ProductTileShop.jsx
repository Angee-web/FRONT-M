import React from "react";
import { Badge } from "@/components/ui/badge";

const ProductTileShop = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  return (
    <div className="border pb-3 rounded-lg bg-[#252525] ">
      <div onClick={() => handleGetProductDetails(product?.id || product?._id)}>
        <div className="relative">
          <div></div>
          <img
            src={product?.image}
            alt={product.name}
            className="w-full  md:h-[300px] object-cover rounded-t "
          />

          {product?.sales > 0 ? (
            <Badge className="absolute top-1 left-2 bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">
              Sale
            </Badge>
          ) : null}
        </div>

        {/* second div */}
        <div className="w-full h-[90px] md:h-[130px] py-1 px-2 ">
          <h2 className="text-[11px] md:text-lg  text-center text-white font-bold mb-1">
            {product?.name}
          </h2>
          <div className="flex flex-col justify-center items-center text-center text-white ">
            <span className="text-[11px] md:text-[15px] xl:text-[19px]">
              {product?.category}
            </span>
            <span className="text-[12px] md:text-[14px] xl:text-[19px] text-center ">
              {product?.types}
            </span>
          </div>
        </div>
        {/* button */}
        <div>
          <div className="flex flex-col md:flex-row h-[50px]  justify-center  gap-1 md:gap-5 items-center  ">
            <span
              // {/* Show original price with line-through if sale price is available */}

              className={`${
                product?.sales > 0 ? "line-through" : ""
              } text-sm md:text-lg font-semibold text-white `}
            >
              ₦{product?.price.toLocaleString()}
            </span>

            {/* Show sale price only if product.sale is available and greater than 0 */}
            {product?.sales > 0 ? (
              <span className="text-sm md:text-lg font-bold text-white">
                ₦{product?.sales}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-3 flex justify-center">
        <button
          onClick={() => handleAddtoCart(product?._id)}
          className="p-1 text-sm md:text-lg md:p-2 w-full xl:w-[80%] rounded-full text-white border border-[#C42571]   hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductTileShop;
