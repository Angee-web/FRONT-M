import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const { orderDetails } = useSelector((state) => state.shopOrder);
  return (
    <div>
      {/* bg-[#1A79FF] */}
      <h4 className="font-medium text-white">Order Summary</h4>
      

      <Table>
        <TableHeader className="bg-[#1A79FF] hover:bg-[#1A79FF] text-white">
          <TableRow>
            <TableHead className="text-white">Product</TableHead>
            <TableHead className="text-center text-white">Qty</TableHead>
            <TableHead className="text-center text-white">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
            ? orderDetails?.cartItems.map((item) => (
                <TableRow
                  key={item?.id}
                  className="bg-black hover:bg-black text-white"
                >
                  <TableCell>
                    <div className="flex gap-3">
                      <span>
                        <img
                          className="w-[4rem] h-[4rem] rounded"
                          src={item.image}
                          alt=""
                        />
                      </span>
                      <span className="text-[11px] md:text-[15px] w-[50%]">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">{item.price}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderSummary;
