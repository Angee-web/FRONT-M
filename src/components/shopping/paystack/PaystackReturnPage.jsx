import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaystackReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get('reference')


  useEffect(()=>{
    if(reference ){
        const  orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))
        console.log(orderId , "orderId")
        console.log("Stored orderId:", sessionStorage.getItem("currentOrderId")); 
        dispatch(capturePayment({ reference, orderId })).then(data=>{
           
            if(data?.payload?.success){
                sessionStorage.removeItem('currentOrderid')
                window.location.href = '/shop/payment-success'
            }
        })
    }
  },[reference, dispatch])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaystackReturnPage;
