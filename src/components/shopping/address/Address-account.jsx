import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/address-slice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './AddressCard';

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



const AddressAccount = () => {
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const user = useSelector((state) => state.auth.user);
    const { addressList } = useSelector((state) => state.shopAddress);


    const handleEditAddress = (getCurrentAddress) => {
      
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
  return (
    <Card className="bg-black">
          <div className="mb-5 p-3  grid grid-cols-1  xl:grid-cols-2 gap-2">
          {addressList && addressList.length > 0
            ? addressList.map((singleAddressItem) => (
                <AddressCard
                  key={singleAddressItem.userId}
                  addressInfo={singleAddressItem}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                />
              ))
            : null}
        </div>
    </Card>
  )
}

export default AddressAccount