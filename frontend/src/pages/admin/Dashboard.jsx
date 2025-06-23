import { Profiler, useEffect, useState } from "react";
import { assets } from "../../assets/assets_admin/assets"
import { assets as fassets } from "../../assets/assets_frontend/assets"
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats, fetchRecentAppointments } from "../../api/dashboard";
import RecentAppointment from "../../components/admin/RecentAppointment";
import { format, parseISO } from "date-fns"

const formatCustomDate = (isoData) => {
  const data = parseISO(isoData)
  return format(data, "do MMMM, yyyy.")
}

const Dashboard = () => {
  const [ stats, setStats ] = useState([]);

  const {
    data: fetchedStats,
    isLoading: loadingStats,
    isError: isErrorStats,
    errors: errorsStats,
    isSuccess: isSuccessStats,
  } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  })

  const {
    data: recentApps,
    isLoading: loadingApps,
    isError: isErrorApps,
    errors: errorsApps,
    isSuccess: isSuccessApps,
  } = useQuery({
    queryKey: ["appointments", "recents"],
    queryFn: fetchRecentAppointments,
  })

  useEffect(() => {
    if (isSuccessStats)
    setStats([
        {
          number: fetchedStats.doctors,
          label: "Doctors",
          icon: assets.doctor_icon,
        },
        {
          number: fetchedStats.appointments,
          label: "Appointments",
          icon: assets.appointments_icon,
        },
        {
          number: fetchedStats.patients,
          label: "Patients",
          icon: assets.patients_icon,
        }
      ])
  }, [isSuccessStats])
  
  if (loadingStats || loadingApps) return <div>Loading...</div>
  if (isErrorStats || isErrorApps) return <div>Error: {errorsStats.message || errorsApps}</div>

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
          {
            recentApps.length > 0 ?
            recentApps.map(app => (
              <RecentAppointment
                key={app.id}
                firstName={app.doctor.first_name}
                lastName={app.doctor.last_name}
                img={fassets.profile_pic}
                date={formatCustomDate(app.appointment_date)}
              />
            )) : <h1>No Appointments found !</h1>
          }
        </div>
      </div>
    </main>
  )
}

export default Dashboard;
