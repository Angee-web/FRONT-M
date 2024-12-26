import CommonForm from "@/components/common/Form";
import OrderSummary from "@/components/shopping/orders/OrderSummary";
import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import AdminOrderSummarys from "./AdminOrderSummarys";
import { useDispatch } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { data } from "autoprefixer";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    console.log(formData);
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
      }
    });
  };

  return (
    <DialogContent
      className="sm:max-w-[600px] max-h-dvh overflow-y-auto p-4" // Add overflow styles
    >
      <div className="grid gap-6">
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
              <Label>{orderDetails?.orderDate}</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Order Price</p>
              <Label>₦{orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Payment Method</p>
              <Label>
                {orderDetails?.paymentMethod &&
                  orderDetails?.paymentMethod.charAt(0).toUpperCase() +
                    orderDetails?.paymentMethod.slice(1)}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Payment Status</p>
              <Label>
                {orderDetails?.paymentStatus &&
                  orderDetails?.paymentStatus.charAt(0).toUpperCase() +
                    orderDetails?.paymentStatus.slice(1)}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Order Status</p>
              <Label>
                {" "}
                <Badge
                  className={`py-1 px-3 text-md ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-400"
                      : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-400"
                      : "bg-black"
                  }`}
                >
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
                <AdminOrderSummarys />
              </ul>
            </div>
          </div>
        </div>

        {/* CommonForm */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                type: "select",
                options: [
                  { value: "pending", label: "Pending" },
                  { value: "in Process", label: " In Process" },
                  { value: "shipped", label: "Shipped" },
                  { value: "delivered", label: "Delivered" },
                  { value: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
