import appointment_img from '../assets/assets_frontend/appointment_img.png';
import Button from './Button';

const CTA = () => {
  return (
    <div className="w-full my-40 flex bg-primary h-[455px] rounded-xl px-24">
        <div className='h-full'>
            <div className='h-full flex flex-col justify-center gap-6'>
                <h1 className="text-6xl font-semibold text-white font-outfit leading-20">Book Appointment With 100+ Trusted Doctors</h1>
                <Button 
                    text="Create Account"
                    bgColor="white"
                    textColor="[#4B5563]"
                />
            </div>
        </div>
        <div className='flex items-end w-2/3'>
            <img 
                src={appointment_img}
                className='h-[529px]'
            />
        </div>
    </div>
  )
}

export default CTA;