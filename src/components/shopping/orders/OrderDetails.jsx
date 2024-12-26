import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";
import OrderSummary from "../../shopping/orders/OrderSummary";
import { useSelector } from "react-redux";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent
      className="sm:max-w-[600px] max-h-dvh overflow-y-auto p-4 bg-white" // Add overflow styles
    >
      <DialogTitle className=" font-semi-bold text-black mt-7 p-1">
        Order Details
      </DialogTitle>
      <div className="grid gap-6">
        <div className="grid gap-2 bg-black text-white p-2 lg:p-4">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>₦{orderDetails?.totalAmount.toLocaleString()}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod   &&
                  orderDetails?.paymentMethod.charAt(0).toUpperCase() +
                  orderDetails?.paymentMethod.slice(1)}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus   &&
                  orderDetails?.paymentStatus.charAt(0).toUpperCase() +
                  orderDetails?.paymentStatus.slice(1)}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>
              {" "}
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-400"
                    : "bg-black"
                }`}
              >
                {" "}
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div>
            {/* <div className="font-medium">Order Summary</div> */}
            <ul className="grid gap-3">
              <OrderSummary />
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <div className="font-medium bg-[#1A79FF] px-4 py-2 text-white">
              Shipping Info
            </div>
            <div className="grid gap-1 text-white  p-4 bg-black">
              <span>
                {user?.userName &&
                  user.userName.charAt(0).toUpperCase() +
                    user.userName.slice(1)}
              </span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.phoneNumber}</span>
              <span>{orderDetails?.addressInfo?.addtionalNumber}</span>
              <span>{orderDetails?.addressInfo?.email}</span>
              <span>{orderDetails?.addressInfo?.notesInformation}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
