import { Profiler, useEffect, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { assets as fassets } from "../../assets/assets_frontend/assets";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getRecentAppointments } from "../../api/dashboard";
import RecentAppointment from "../../components/admin/RecentAppointment";
import { format, parseISO } from "date-fns";
import Skeleton from "react-loading-skeleton";
import ErrorComponent from "../../components/ErrorComponent";

const formatCustomDate = (isoData) => {
  const data = parseISO(isoData);
  return format(data, "do MMMM, yyyy.");
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  const {
    data: fetchedStats,
    isLoading: loadingStats,
    isError: isErrorStats,
    errors: errorStats,
    isSuccess: isSuccessStats,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  });

  const {
    data: recentApps,
    isLoading: loadingApps,
    isError: isErrorApps,
    errors: errorApps,
    refetch: refetchApps,
  } = useQuery({
    queryKey: ["appointments", "recents"],
    queryFn: getRecentAppointments,
  });

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
        },
      ]);
  }, [isSuccessStats]);

  return (
    <main className="w-full p-10">
      <div className="w-fit">
        <div className="flex gap-10">
          {isErrorStats ? (
            <ErrorComponent
              title={
                "Unable to load stats: " +
                  errorStats?.response?.data?.errors[0]?.code ||
                errorStats.message
              }
              retry={refetchStats}
            />
          ) : loadingStats ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex w-fit pl-2 pr-12 py-3.5 gap-4 rounded-lg border-gray-200 border"
                >
                  <Skeleton circle width={50} height={50} />
                  <div className="flex flex-col justify-center">
                    <Skeleton width={70} height={12} />
                    <Skeleton width={100} height={12} />
                  </div>
                </div>
              ))
          ) : (
            stats.map((stat, index) => (
              <div
                className="flex w-fit pl-2 pr-12 py-3.5 gap-4 rounded-lg border-gray-200 border"
                key={index}
              >
                <img src={stat.icon} className="rounded-full" />
                <div className="flex flex-col justify-center">
                  <span className="text-[#515151] font-medium font-outfit text-xl">
                    {stat.number}
                  </span>
                  <span className="font-outfit text-[#8893B0]">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-20 border border-gray-200 px-6 rounded-lg w-full">
          <h2 className="text-[#323232] text-lg font-outfit flex items-center font-medium gap-4 py-4 border-b border-b-gray-200">
            <img src={assets.list_icon} className="size-5" />
            <span>Latest Appointments</span>
          </h2>
          <div className="flex py-10 flex-col gap-8">
            {isErrorStats ? (
              <ErrorComponent
                title={
                  "Unable to load recent appointments: " +
                    errorApps?.response?.data?.errors[0]?.code !=
                    undefined || errorApps.message
                }
                retry={refetchApps}
              />
            ) : loadingApps ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div className="flex gap-4">
                    <Skeleton circle width={50} height={50} />
                    <div>
                      <Skeleton height={12} width={150} />
                      <Skeleton height={12} width={100} />
                    </div>
                  </div>
                ))
            ) : recentApps.length > 0 ? (
              recentApps.map((app) => (
                <RecentAppointment
                  key={app.id}
                  id={app.id}
                  firstName={app.doctor.first_name}
                  lastName={app.doctor.last_name}
                  img={app.doctor.image}
                  date={formatCustomDate(app.appointment_date)}
                />
              ))
            ) : (
              <h1 className="text-center font-outfit text-gray-500 text-lg">
                No Appointments found.
              </h1>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
