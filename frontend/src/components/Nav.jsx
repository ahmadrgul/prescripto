import logo from '../assets/assets_frontend/logo.svg';
import Button from './Button';
import { assets } from '../assets/assets_frontend/assets';
import { Link } from 'react-router';

const Nav = () => {
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
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/doctors">ALL DOCTORS</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/contact">CONTACT</Link></li>
            </ul>
        </div>
        <div className='hidden md:block'>
            <Link to="/register">
                <Button 
                    text="Create Account"
                    bgColor="primary"
                    textColor="white"
                />
            </Link>
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