import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShoppingProductTile from "./ProductTileShopping";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductTileShop from "./ProductTileShop";
import { Button } from "@/components/ui/button";

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [sort, setSort] = useState("price-low-high"); // Set default sort option

  // Handle sorting change

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

  // Fetch products for the "couples" category on initial load and on sort change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ category: "", sort, limit: 4 }));
  }, [dispatch, sort]);
  return (
    <div className="bg-[#252525] ">
      <div>
        <img
          src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732261811/Mern-Ecommerce/giphy_3_pbdn51.png"
          alt=""
        />
      </div>
      <div className="flex gap-4 justify-center items-center mx-auto mt-5 px-2 py-5  md:px-7 xl:px-[40px]">
        <Link
          to="/shop/all-products "
          className="flex-1 xl:w-fit flex justify-end"
        >
          <button className="w-full lg:w-[60%] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white px-4 py-2 md:px-1 rounded-full text-xs md:text-lg xl:py-4 xl:text-2xl hover:scale-105 transition-transform">
            ALL PRODUCT
          </button>
        </Link>
        <Link className="flex-1 xl:w-fit flex justify-start">
          <button className="w-full lg:w-[60%] bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] text-white px-4 py-2 md:px-1 rounded-full text-xs md:text-lg xl:py-4 xl:text-2xl hover:scale-105 transition-transform">
            SELL A PRODUCT
          </button>
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <p className="text-white text-center p-5 md:w-[75%] lg:w-[60%] lg:text-xl xl:text-2xl">
          Welcome to ALLSEXTOY and THERAPY Your Destination for Intimacy and
          Exploration. Discover a world of high-quality, body-safe adult toys
          designed to elevate your pleasure and empower your desires.{" "}
        </p>
      </div>

      {/* popular products */}
      <div className="py-5">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white">
          Popular Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 h-full">
          {productList?.length > 0 ? (
            productList.map((productItem, index) => (
              <ProductTileShop
                key={index}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          ) : (
            <p className="col-span-full text-center">No products available</p>
          )}
        </div>
      </div>

      {/*  */}
      <section className="p-5 mt-5 flex flex-col justify-center items-center  ">
        {/* first div */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-black text-white p-5 rounded-xl xl:p-10">
          <span>
            <img
              className="w-full h-auto xl:max-h-[700px] rounded-xl"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1731327526/Mern-Ecommerce/image_18_ff0jwm.png"
              alt=""
            />
          </span>
          <span className="flex flex-col gap-4 lg:w-[90%] justify-center items-center">
            <h2 className="font-bold text-xl lg:text-3xl text-center">
              Secret Spark
            </h2>
            <p className="text-center  lg:text-xl xl:w-[70%]">
              This is a G-Spot Vibrator for Women with Rabbit Tapping Vibrator 3
              in 1 Couple Vibrator Personal Massager,
            </p>
            <p className="text-center  lg:text-xl xl:w-[70%]">
              【Unique Tapping Design】:The unique tapping design provides you
              with the ultimate experience. This innovative vibrator not only
              has a strong sense of design, but also allows you to experience
              the best functions.
            </p>

            <button className="border border-[#C42571] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5] py-3 lg:mt-9 rounded-full w-full xl:w-[50%]">
              Shop Now
            </button>
          </span>
        </div>

        {/* third div */}
        {/* <div className="flex flex-col-reverse md:flex-row gap-4 justify-center items-center bg-black text-white p-5 rounded-xl mt-5">
                <span className="flex flex-col gap-4 ">
                  <h2 className="font-bold text-xl lg:text-3xl text-center">
                    Are you feeling overwhelmed by life’s challenges and struggling to
                    find clarity?
                  </h2>
                  <p className="text-center  lg:text-xl">
                    Life can sometimes feel confusing, and even exhausting. Whether
                    it’s career stress, relationship struggles, or simply navigating
                    the uncertainty of everyday life, it’s normal to feel stuck or
                    down. If you’re feeling lost or weighed down, our therapy sessions
                    are here to help you make sense of it all and regain control.
                  </p>
                </span>
                <span>
                  <img
                    className="w-full h-auto"
                    src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1729790289/Mern-Ecommerce/Rectangle_25_m2t0k1.png"
                    alt="image"
                  />
                </span>
              </div>
       */}
      </section>

      {/* Second to the last section of the page */}
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-6 xl:p-10 justify-center items-center text-center text-white md:w-[60%]">
          <h2 className="lg:text-2xl xl:text-3xl">
            World Class Pleasure: Adult Sex Toy Store
          </h2>
          <p className="lg:text-xl xl:text-2xl xl:w-[70%]">
            Shop adult toys and discover world leading couples and solo pleasure
            products. We’re working hard to spread the joy of body-safe and
            eco-friendly [Company name] pleasure products around the globe. Our
            sex toy store offers a selection of sex toy, and All products found
            at our shop are designed to work in sync with the human body for
            deep intimacy and connection.
          </p>
        </div>
        <div className="mt-3">
          <img
            src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732620669/Mern-Ecommerce/close-up-sex-toys_1_aoofhz.png"
            alt=""
          />
        </div>
      </section>

      {/* last section */}
      <section className="mt-4 py-5">
        <div className="flex flex-wrap  justify-center items-center gap-3 text-white">
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Vector_ozan37.png"
              alt=""
            />
            <h2>Premium Quanlity</h2>
            <p>
              All Products include authentic manufacturer’s warranty, so you can
              be assured of their quality.
            </p>
          </div>
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Vector2_opygjf.png"
              alt=""
            />
            <h2>Private and Secure</h2>
            <p>
              [Company name] uses a secure connection to protect your
              privacy.Purchase as a guest or create an account.
            </p>
          </div>
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Group_i3cdcq.png"
              alt=""
            />
            <h2>Body Safe</h2>
            <p>
              All Products are made from body-safe materials-free from
              phthalates and BPA and made without latex
            </p>
          </div>
          <div className="bg-black w-[220px] h-[220px] p-3 flex flex-col justify-center items-center text-center rounded-xl">
            <img
              className="w-9 h-10"
              src="https://res.cloudinary.com/dtlejpoxq/image/upload/v1732623090/Mern-Ecommerce/Vector3_ghomdu.png"
              alt=""
            />
            <h2>Discreet Delivery</h2>
            <p>
              Packaged in plain boxes with a discreet label, orders are shipped
              and billed by our highly trusted dispatch riders
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
