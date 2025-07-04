import { Outlet } from "react-router";
import AdminNav from "../components/admin/AdminNav";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminNav />
      <div className="flex w-full">
        <AdminSidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
