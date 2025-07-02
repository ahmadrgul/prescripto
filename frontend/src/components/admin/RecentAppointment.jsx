import { useMutation } from "@tanstack/react-query";
import { assets } from "../../assets/assets_admin/assets";
import { cancelAppointment } from "../../api/appointments"
import { toast } from "react-toastify";
import { handleAPIError } from "../../utils/handleAPIError"

const RecentAppointment = ({ id, firstName, lastName, img, date }) => {

  const mutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: (data) => {
      toast.success("Appointment has been cancelled.")
    },
    onError: handleAPIError,
  })

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <img src={`http://localhost:8000/${img}`} className="rounded-full size-12" />
        <div>
          <h2 className="text-[#262626] text-lg font-medium font-outfit">{`Dr. ${firstName} ${lastName}`}</h2>
          <span className="text-[#696B80] font-outfit">Booking on {date}</span>
        </div>
      </div>
      <button 
        className="cursor-pointer"
        onClick={() => mutation.mutate(id)}  
      >
        <img src={assets.cancel_icon} />
      </button>
    </div>
  );
};

export default RecentAppointment;
