import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  
}) => {

 
  return (
    <div>
      <Card
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className="bg-black border-[#797979]"
      >
        <CardContent className="grid  gap-4 p-4 border-[#797979] text-white">
          <Label className=" py-2">
            Address: {addressInfo?.address}
          </Label>
          <Label className=" py-2">
            City: {addressInfo?.city}
          </Label>
          <Label className=" py-2">
            Phone: {addressInfo?.phoneNumber}
          </Label>
          <Label className=" py-2">
            Fullname: {addressInfo?.fullName}
          </Label>
          <Label className=" py-2">
            Email: {addressInfo?.email}
          </Label>
          <Label className=" py-2">
            Addtional-Number: {addressInfo?.additionalNumber}
          </Label>
          <Label className=" py-2">
            Information: {addressInfo?.notesInformation}
          </Label>
          <Label className=" py-2">
            Region: {addressInfo?.region}
          </Label>
        </CardContent>
        <CardFooter className="flex justify-center gap-2 p-2">
          <Button
            onClick={() => handleEditAddress(addressInfo)}
            className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-[40%] text-white"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteAddress(addressInfo)}
            className="bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)] w-[40%] text-white"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;
