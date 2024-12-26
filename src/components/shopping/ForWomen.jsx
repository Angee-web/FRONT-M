import React, { useEffect, useState } from "react";
import ShoppingProductTile from "@/pages/shopping-view/ProductTileShopping";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { sortOptions } from "../../config/index";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductTileShop from "../../pages/shopping-view/ProductTileShop";


const ForWomen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [sort, setSort] = useState("price-low-high"); // Set default sort option

  // Handle sorting change
  const handleSort = (value) => {
    setSort(value);
  };

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    navigate(`/shop/product/${getCurrentProductId}`); // Navigate to the product detail page
    // console.log(`Navigating to: /product/${getCurrentProductId}`);
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
          title: "Product is added to cart",
        });
      }
    });
  }

  // Fetch products for the "women" category on initial load and on sort change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category: "women", sort }));
  }, [dispatch, sort]);

  // console.log(productDetails, "productDetails");

  return (
    <div className="bg-[#252525] h-auto flex flex-col justify-center w-full">
      <div className="p-7 flex justify-center w-full">
        <img
          src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1730560793/Mern-Ecommerce/ForWomen_ymlkst.png"
          alt="For Women"
        />
      </div>

      {/* Sort and Product Count */}
      <div className="flex justify-between text-white items-center px-7">
        {/* Sort Dropdown */}
        <div className="flex justify-start text-white py-7 gap-2">
          <h3>Sort By</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-end gap-1 w-[6rem] bg-black text-white border">
                <RiArrowDropDownLine className="text-lg" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Count */}
        <div>{productList.length} Products</div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 px-7">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              // <ShoppingProductTile
              //   key={index}
              //   product={productItem}
              //   handleGetProductDetails={handleGetProductDetails}
              //   handleAddtoCart={handleAddtoCart}
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
  );
};

export default ForWomen;
