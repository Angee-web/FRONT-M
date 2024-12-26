import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/index";

import { useEffect, useState } from "react";
import ProductImageUpload from "./image-upload/Image-upload";

import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import AdminProductTile from "./admin-view2/Product-tile";


const initialFormData = {
  image: null,
  name: "",
  price: "",
  description: "",
  category: "",
  stock: "",
  types: "",
  // productType: "",
  sales: "",
};

const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [uploadedImageURLs, setUploadedImageURLs] = useState([]); // New state for multiple images
  const { toast } = useToast();
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch = useDispatch();

  const [imageLoadingState, setImageLoadingState] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    // Determine the primary image
    const primaryImage = uploadedImageURL || uploadedImageURLs[0] || null;

    // Add the single image URL to the images array if not already included
    const allImageURLs = uploadedImageURLs.includes(uploadedImageURL)
      ? uploadedImageURLs
      : [...uploadedImageURLs, uploadedImageURL].filter(Boolean);

    // Dispatch the payload with both image and images fields
    dispatch(
      addNewProduct({
        ...formData,
        image: primaryImage, // Set the primary image
        images: allImageURLs, // Pass all uploaded image URLs
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setUploadedImageURLs([]);
        setUploadedImageURL(""); // Reset the single URL
        setFormData(initialFormData);
        setOpenCreateProduct(false);
        toast({ title: "Product added successfully" });
      }
    });
  }
  // console.log("FormData on Submit:", formData);



  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product deleted successfully",
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Add New Product
        </Button>
      </div>

      {/* This is the product tile card */}
      <div className="grid gap-4 md:grid-cols-3  ">

        {productList?.data?.length > 0 ? (
          productList.data.map((productItem, i) => (
            <AdminProductTile
              key={i}
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProduct={setOpenCreateProduct}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No product found</p>
        )}
      </div>

      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>


          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            uploadedImageURLs={uploadedImageURLs}
            setUploadedImageURLs={setUploadedImageURLs}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            multiple={true} // Enable multiple uploads
          />


        
          {/* This is the commonform component */}

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Update" : "Add Product"}
              borderRadius="rounded-md"
              onSubmit={onSubmit}
              isBtnDisable={!isFormValid}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;





{
  /* //           <div>
//             <h3 className="font-semibold my-2">Uploaded Image URLs:</h3>
//             {uploadedImageURLs.length > 0 ? (
//               uploadedImageURLs.map((url, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <img
//                     src={url}
//                     alt={`Uploaded ${index}`}
//                     className="h-16 w-16 object-cover"
//                   />
//                   <span className="text-sm">{url}</span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500">No images uploaded yet.</p>
//             )}
//           </div> */
}

{
  /* <MultiImageUpload/> */
}