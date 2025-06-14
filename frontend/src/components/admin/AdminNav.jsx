import { assets } from '../../assets/assets_frontend/assets'
import Button from '../Button'
import { Link } from 'react-router'

const AdminNav = () => {
  return (
    <nav className='flex justify-between px-8 py-2 border-b border-[#BEBEBE]'>
      <div className='flex gap-2 items-center'>
        <img 
            src={assets.logo}
        />
        <span className="border border-[#4B5563] px-2 py-1 text-xs text-[#4B5563] rounded-full">Admin</span>
      </div>
      <div>
          <Link to="/logout">
              <Button 
                  text="Logout"
                  bgColor="primary"
                  textColor="white"
              />
          </Link>
      </div>
    </nav>
  )
}

export default AdminNav;
