import logo from '../assets/assets_frontend/logo.svg'
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer>
        <div className='flex flex-col md:flex-row py-10 w-full justify-between gap-20 font-outfit border-b border-[#ADADAD] mt-60'>
            <div className='w-full'>
                <img 
                    src={logo}
                />
                <p className='text-lg text-[#4B5563] mt-10'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <div className='flex justify-around w-full'>
                <div className=''>
                    <h3 className='text-2xl font-semibold text-[#4B5563] mb-8'>COMPANY</h3>
                    <ul className='flex flex-col gap-4 text-xl text-[#4B5563]'>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/about"><li>About Us</li></Link>
                        <Link to="/contact"><li>Contact Us</li></Link>
                        <Link to="/"><li>Privacy Policy</li></Link>
                    </ul>
                </div>
                <div>
                    <h3 className='text-2xl font-semibold text-[#4B5563] mb-8'>GET IN TOUCH</h3>
                    <ul className='flex flex-col gap-4 text-xl text-[#4B5563]'>
                        <li><a href='tel:+12124567890'>+1-212-456-7890</a></li>
                        <li><a href='mailto:hello@prescripto.com'>hello@prescripto.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <h4 className='my-10 font-outfit text-center text-[#4B5563] text-xl'>
            Copyright © 2025 Prescripto. All rights reserved.
        </h4>
    </footer>
  )
}

export default Footer;