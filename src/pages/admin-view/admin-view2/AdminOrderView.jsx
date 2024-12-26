import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "@/components/ui/badge";
import AdminOrderDetailsView from "./OrderDetails";

const AdminOrderView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList, orderDetails, isLoading}= useSelector((state)=>state.adminOrder)
  const dispatch = useDispatch()


const handleFetchOrderDetails = (getId)=>{
  dispatch(getOrderDetailsForAdmin(getId))
}

console.log(orderDetails , "orderDetails")

  useEffect(()=>{
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  console.log(orderList, "orderList")

  useEffect(()=>{
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails])


  if (isLoading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table  >
          <TableHeader >
            <TableRow >
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-400"
                            : "bg-black"
                        }`}
                      >
                        {" "}
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₦ {orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>

                       <AdminOrderDetailsView orderDetails={orderDetails}/>
                        
                        
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrderView;
