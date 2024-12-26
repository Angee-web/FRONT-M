import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice";
import CommonForm from "@/components/common/Form";
import AddressFormData from "@/components/common/AddressFormData";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./AddressCard";

const initialAddressFormData = {
  address: "",
  city: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  additionalNumber: "",
  notesInformation: "",
  region: "",
};

const Address = ({currentSelectedAddress,setCurrentSelectedAddress}) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 2 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can only add 2 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              // console.log(user?.id, "user? id"); //debugging
              setFormData(initialAddressFormData);
              toast({
                title: "Address added successfully",
              });
            }
          }
        );
  };

  //This is the delete address function
  const handleDeleteAddress = (getCurrentAddress) => {
    // console.log(getCurrentAddress, "getCurrentAddress"); //debugging
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
      }
    });
    toast({
      title: "Address deleted successfully",
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    // console.log(getCurrentAddress, "getCurrentAddress"); //debugging
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      fullName: getCurrentAddress?.fullName,
      email: getCurrentAddress?.email,
      phoneNumber: getCurrentAddress?.phoneNumber,
      additionalNumber: getCurrentAddress?.additionalNumber,
      notesInformation: getCurrentAddress?.notesInformation,
      region: getCurrentAddress?.region,
    });
  };



  // This to clear the formdata
  
  
  const handleClearForm = (e) => {
    e.preventDefault();
    setFormData(initialAddressFormData);
    toast({
      title: "Form cleared successfully",
    });
  };

  // console.log(formData, "formData"); //debugging
  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

//   console.log(addressList, "addressList"); //debugging
// console.log(currentSelectedAddress, "currentSelectedAddress"); //debugging
  return (
    <div>
      <Card className="text-white bg-black">
        <div className="mb-5 p-3 grid grid-cols-1  xl:grid-cols-2 gap-2">
          {addressList && addressList.length > 0
            ? addressList.map((singleAddressItem) => (
                <AddressCard
                  key={singleAddressItem._id}
                  addressInfo={singleAddressItem}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                  setCurrentSelectedAddress = {setCurrentSelectedAddress}
                
                />
              ))
            : null}
        </div>
        <CardHeader>
          <CardTitle>
            {currentEditedId !== null ? "Edit Address" : "Contact Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <AddressFormData
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleManageAddress}
            handleClearForm={handleClearForm}
            currentEditedId={currentEditedId}
           
            
            // isBtnDisable={isFormValid()}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Address;
