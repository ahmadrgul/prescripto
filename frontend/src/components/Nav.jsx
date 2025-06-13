import logo from '../assets/assets_frontend/logo.svg';
import Button from './Button';
import { assets } from '../assets/assets_frontend/assets';

const Nav = () => {
  return (
    <nav className='flex justify-between items-center border-b border-[#ADADAD] py-4'>
        <div>
            <img 
                src={logo}
                alt="Logo"
                className='object-contain'
            />
        </div>
        <div className='hidden md:block'>
            <ul className='flex gap-6 text-[16px] text-[#1F2937] font-medium font-poppins'>
                <li><a href="/">HOME</a></li>
                <li><a href="/doctors">ALL DOCTORS</a></li>
                <li><a href="/about">ABOUT</a></li>
                <li><a href="/contact">CONTACT</a></li>
            </ul>
        </div>
        <div className='hidden md:block'>
            <Button 
                text="Create Account"
                bgColor="primary"
                textColor="white"
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