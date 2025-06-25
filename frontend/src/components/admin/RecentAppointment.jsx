import { assets } from "../../assets/assets_admin/assets"

const RecentAppointment = ({ firstName, lastName, img, date }) => {
  return (
    <div className="flex justify-between">
        <div className="flex gap-4">
            <img 
            src={img}
            className="rounded-full size-12"
            />
            <div>
              <h2 className="text-[#262626] font-medium font-outfit">{`Dr. ${firstName} ${lastName}`}</h2>
              <span className="text-[#696B80] font-outfit">Booking on {date}</span>
            </div>
        </div>
        <button className="cursor-pointer">
            <img 
            src={assets.cancel_icon}
            />
        </button>
    </div>
  )
}

export default RecentAppointment