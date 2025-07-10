import { Outlet } from "react-router";
import AdminNav from "../components/admin/AdminNav";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
    <div className="hidden lg:block">
        <AdminNav />
        <div className="flex w-full">
          <AdminSidebar />
          <Outlet />
        </div>
    </div>
    <h1 className="lg:hidden text-center font-outfit text-xl font-gray-700">Please use a Desktop to access Admin Panel.</h1>
    </>
  );
};

export default AdminLayout;
