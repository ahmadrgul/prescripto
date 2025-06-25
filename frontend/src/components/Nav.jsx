import logo from '../assets/assets_frontend/logo.svg';
import Button from './Button';
import { assets } from '../assets/assets_frontend/assets';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const tabs = [
      {
          title: 'HOME',
          path: '/',
      },
      {
          title: 'ALL DOCTORS',
          path: '/doctors',
      },
      {
          title: 'ABOUT',
          path: '/about',
      },
      {
          title: 'CONTACT',
          path: '/contact',
      },
  ]

  return (
    <nav className='flex justify-between items-center border-b border-[#ADADAD] py-4 mb-10'>
        <div>
            <Link
                to="/"
            >
                <img 
                    src={logo}
                    alt="Logo"
                    className='object-contain'
                />
            </Link>
        </div>
        <div className='hidden md:block'>
            <ul className='flex gap-6 text-[16px] text-[#1F2937] font-medium font-poppins'>
                {tabs.map(tab => (
                    <li>
                        <NavLink 
                            to={tab.path}
                            className={({ isActive }) => `border-b-2 pb-2 ${isActive ? "border-b-primary" : "border-b-transparent"}`}
                        >
                            {tab.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
        <div className='hidden md:block'>
            <Link to="/register" className={`${isAuthenticated && "hidden"}`}>
                <Button 
                    text="Create Account"
                    bgColor="primary"
                    textColor="white"
                />
            </Link>
            <Button 
                text="Logout"
                bgColor="primary"
                textColor="white"
                className={`${!isAuthenticated && "hidden"}`}
                onClick={() => {
                    logout();
                    toast.success("You've been logged out successfully");
                    navigate("/");
                }}
            />
        </div>
        <div className='md:hidden'>
            <button className='text-2xl text-[#1F2937]'>
                <img 
                    src={assets.burger_menu}
                    className='size-8'
                />
            </button>
        </div>
    </nav>
  )
}

export default Nav;