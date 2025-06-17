import { assets } from '../../assets/assets_admin/assets'
import Button from '../Button'
import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'

const AdminNav = () => {
  const { logout } = useAuth();

  return (
    <nav className='flex justify-between px-8 py-4 border-b border-[#BEBEBE]'>
      <Link to="/admin" className='flex cursor-pointer gap-2 items-center'>
        <img 
            src={assets.admin_logo}
        />
        <span className="border border-[#4B5563] px-2 py-1 text-xs text-[#4B5563] rounded-full">Admin</span>
      </Link>
      <div>
          <Button 
              text="Logout"
              bgColor="primary"
              textColor="white"
              onClick={logout}
          />
      </div>
    </nav>
  )
}

export default AdminNav;
