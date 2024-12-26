import React from "react";

import AdminOrderView from "./admin-view2/AdminOrderView";
import {  useSelector } from "react-redux";

const AdminOrders = () => {
  const {isLoading}= useSelector((state)=>state.adminProducts)
  if (isLoading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <p className="text-center font-bold text-3xl">Loading...</p>
        <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  return (
    <div>
      <AdminOrderView />
    </div>
  );
};

export default AdminOrders;
