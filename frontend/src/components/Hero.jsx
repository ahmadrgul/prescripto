import { Link } from 'react-router';
import group_profiles from '../assets/assets_frontend/group_profiles.png';
import header_img from '../assets/assets_frontend/header_img.png';
import CTAButton from './CTAButton';

const Hero = () => {
  return (
    <div className="w-full pt-6 md:pt-0 justify-between flex flex-col md:flex-row gap-6 bg-primary h-fit md:h-[698px] rounded-xl mt-5 pl-4 sm:pl-8 md:pl-12 lg:pl-24 pr-4">
        <div className=''>
            <div className='h-full flex flex-col justify-center gap-8'>
                <h1 className="text-5xl md:text-6xl font-semibold text-white font-outfit leading-12 md:leading-20">Book Appointment With Trusted Doctors</h1>
                <div className='flex items-center gap-4'>
                    <img 
                        src={group_profiles}
                        className='h-12 hidden sm:block'
                    />
                    <p className='font-outfit text-lg text-white leading-6'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
                <Link
                    to="/doctors"
                    className='w-fit'
                >
                    <CTAButton />
                </Link>
            </div>
        </div>
        <div className='flex items-end w-full'>
            <img 
                src={header_img}
            />
        </div>
    </div>
  )
}

export default Hero;