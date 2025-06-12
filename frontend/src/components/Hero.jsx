import group_profiles from '../assets/assets_frontend/group_profiles.png';
import header_img from '../assets/assets_frontend/header_img.png';
import CTAButton from './CTAButton';

const Hero = () => {
  return (
    <div className="w-full flex gap-6 bg-primary h-[698px] rounded-xl mt-5 pl-24 pr-4">
        <div className='h-full'>
            <div className='h-full flex flex-col justify-center gap-6'>
                <h1 className="text-6xl font-semibold text-white font-outfit leading-20">Book Appointment With Trusted Doctors</h1>
                <div className='flex gap-4'>
                    <img 
                        src={group_profiles}
                        className='h-12'
                    />
                    <p className='font-outfit text-lg text-white leading-6'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
                <CTAButton />
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