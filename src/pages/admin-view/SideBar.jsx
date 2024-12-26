import React from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { FaFirstOrderAlt } from "react-icons/fa6"; 
import { FaUserMd } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LuLayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <MdOutlineProductionQuantityLimits />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <FaFirstOrderAlt />,
  },
  {
    id: "therapists",
    label: "Therapists",
    path: "/admin/edit",
    icons: <FaUserMd />, // New therapist icon
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2 ">
      {adminSideBarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            // Close the sidebar when a menu item is clicked
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xl"
        >
          {menuItem.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full ">
              <SheetHeader className="border-b">
                <SheetTitle className="flex  gap-2 my-5 ">
                  <IoAnalyticsSharp size={30} />
                  <span> Admin Panel</span>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className=" flex cursor-pointer items-center gap-2 "
        >
          <IoAnalyticsSharp className="text-xl font-extrabold" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <div>
          <MenuItems />
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;
