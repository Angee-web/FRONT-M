import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./Layout";
import AdminDashboard from "./Dashboard";
import AdminProducts from "./Products";
import AdminOrder from "./admin-view2/AdminOrderView";
import AdminFeatures from "./Features";

import TherapistEdit from "./therapycreation/TherapistEdit";
import TherapistCreate from "./therapycreation/TherapistCreate";
import Therapists from "./therapycreation/Therapists";
import TherapistCreation from "./therapycreation/TherapistView";
import MultiImageUploader from "./therapycreation/Multiple";

const Admin = () => {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrder />} />
          <Route path="/features" element={<AdminFeatures />} />

           <Route path="/edit" element={<Therapists />} />
            <Route path="/edit/:id" element={<TherapistCreation />} />
            <Route path="/editTherapist/:id" element={<TherapistEdit />} />
            <Route path="/add-therapist/" element={<TherapistCreate />} />
            <Route path="/multiple" element={<MultiImageUploader />} />

        </Routes>
      </AdminLayout>
    </div>
  );
};

export default Admin;
