import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const AdminProductTile = ({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProduct,
  handleDelete,
}) => {
  // console.log("AdminProductTile product:", product);
  return (
    <div>
      {/* This card is to get the product information */}
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />

            {product?.sales > 0 ? (
              <Badge className="absolute top-1 left-2 bg-gradient-to-b from-[#C42571] to-[#004DB5] hover:bg-gradient-to-b hover:from-[#C42571] hover:to-[#004DB5]">
                Sale
              </Badge>
            ) : null}
          </div>
          {/* This is where all the card content will be stored */}
          <CardContent>
            <h2 className="text-xl font-bold my-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              {/* Show original price with line-through if sale price is available */}
              <span
                className={`${
                  product?.sales > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ₦{product?.price.toLocaleString()}
              </span>

              {/* Show sale price only if product.sale is available and greater than 0 */}
              {product?.sales > 0 ? (
                <span className="text-lg font-bold">₦{product?.sales}</span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {/* So Basically the button is to handle the editing field but when it is clicked the button shows up the  setOpenCreateProduct and the available formData */}
            <Button
              onClick={() => {
                setOpenCreateProduct(true);
                setFormData(product);
                setCurrentEditedId(product._id);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(product._id)}>Delete</Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default AdminProductTile;
