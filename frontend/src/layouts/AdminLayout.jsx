import { Outlet } from 'react-router';
import AdminNav from '../components/admin/AdminNav';

const AdminLayout = () => {
  return (
    <>
        <AdminNav />
        <Outlet />
    </>
  )
}

export default AdminLayout;
