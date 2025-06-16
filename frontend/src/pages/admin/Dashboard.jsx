import { Profiler } from "react";
import { assets } from "../../assets/assets_admin/assets"
import { assets as fassets } from "../../assets/assets_frontend/assets"

const Dashboard = () => {

  const stats = [
    {
      number: 14,
      label: "Doctors",
      icon: assets.doctor_icon,
    },
    {
      number: 2,
      label: "Appointments",
      icon: assets.appointments_icon,
    },
    {
      number: 5,
      label: "Patients",
      icon: assets.patients_icon,
    }
  ]

  return (
    <main className="w-full p-10">
      <div className="flex gap-10">
        {
          stats.map((stat, index) => (
            <div 
              className="flex w-fit pl-2 pr-12 py-3.5 gap-4 rounded-lg border-gray-200 border"
              key={index}
            >
              <img 
                src={stat.icon}
                className="rounded-full"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[#515151] font-medium font-outfit text-xl">{stat.number}</span>
                <span className="font-outfit text-[#8893B0]">{stat.label}</span>
              </div>
            </div>
          ))
        }
      </div>
      <div className="mt-20 border border-gray-200 px-6 rounded-lg">
        <h2 className="text-[#323232] text-lg font-outfit flex items-center font-medium gap-4 py-4 border-b border-b-gray-200">
          <img 
            src={assets.list_icon}
            className="size-5"
          />
          <span>
            Latest Appointments
          </span>
        </h2>
        <div className="flex py-10 flex-col gap-8">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img 
                src={fassets.profile_pic}
                className="rounded-full size-12"
              />
              <div>
                <h2 className="text-[#262626] font-medium font-outfit">Dr. Richard James</h2>
                <span className="text-[#696B80] font-outfit">Booking on 24th July, 2025</span>
              </div>
            </div>
            <button className="cursor-pointer">
              <img 
                src={assets.cancel_icon}
              />
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img 
                src={fassets.profile_pic}
                className="rounded-full size-12"
              />
              <div>
                <h2 className="text-[#262626] font-medium font-outfit">Dr. Richard James</h2>
                <span className="text-[#696B80] font-outfit">Booking on 24th July, 2025</span>
              </div>
            </div>
            <button className="cursor-pointer">
              <img 
                src={assets.cancel_icon}
              />
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img 
                src={fassets.profile_pic}
                className="rounded-full size-12"
              />
              <div>
                <h2 className="text-[#262626] font-medium font-outfit">Dr. Richard James</h2>
                <span className="text-[#696B80] font-outfit">Booking on 24th July, 2025</span>
              </div>
            </div>
            <button className="cursor-pointer">
              <img 
                src={assets.cancel_icon}
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard;
