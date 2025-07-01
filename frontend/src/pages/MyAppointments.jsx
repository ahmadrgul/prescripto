import AppointmentCard from "../components/AppointmentCard";
import { doctors } from "../assets/assets_frontend/assets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment, getAppointments } from "../api/appointments";
import { useState } from "react";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ErrorComponent from "../components/ErrorComponent";

const MyAppointments = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState("scheduled");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["appointments", selectedStatus],
    queryFn: () => getAppointments({ status: selectedStatus }),
  });

  const mutation = useMutation({
    mutationKey: ["appointments"],
    mutationFn: (id) => cancelAppointment(id),
    onSuccess: (data) => {
      toast.success("Success. Appointment has been cancelled");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  return (
    <main className="font-outfit">
      <div className="flex justify-between">
        <h1 className="text-[#4B5563] font-medium text-2xl">My Appointments</h1>
        <select
          value={selectedStatus}
          className="border-b border-b-gray-300 outline-none"
          onChange={(e) => {
            setSelectedStatus(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <hr className="text-gray-300 mt-6 mb-4" />
      <div>
        {isError ? (
          <ErrorComponent
            title={`Unable to load appointments: ${
              error?.response?.data?.errors[0]?.code || error.message
            }`}
            retry={refetch}
          />
        ) : isLoading ? (
          Array(3)
            .fill(0)
            .map(_ => (
              <div>
                <div className="flex gap-4 w-full">
                  <div className="w-52 h-52 flex items-end">
                    <Skeleton width={208} height={208} />
                  </div>
                  <div className="flex flex-col justify-between w-2/3">
                    <div>
                      <Skeleton height={18} width={220} />
                      <Skeleton height={12} width={150} />
                    </div>
                    <div>
                      <Skeleton height={14} width={100} />
                      <Skeleton height={12} width={380} />
                      <Skeleton height={12} width={330} />
                    </div>
                    <div>
                      <Skeleton height={12} width={280} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between w-full items-end">
                    <Skeleton width={100} height={30} />
                    <div className="flex flex-col gap-2 justify-end">
                      <Skeleton width={250} height={40} />
                      <Skeleton width={250} height={40} />
                    </div>
                  </div>
                </div>
                <hr className="text-gray-300 mt-6 mb-4" />
              </div>
            ))
        ) : (
          data.results.map((appt) => (
            <div key={appt.id}>
              <AppointmentCard
                docId={appt.doctor.id}
                docImg={appt.doctor.image}
                docName={`Dr. ${appt.doctor.first_name} ${appt.doctor.last_name}`}
                docSpeciality={appt.doctor.speciality}
                docAddressLine1={appt.doctor.address_line1}
                docAddressLine2={appt.doctor.address_line2}
                apptDate={appt.appointment_date}
                apptTime={appt.appointment_time}
                apptStatus={appt.state}
                isPaid={appt.paid}
                cancelFn={() => mutation.mutate(appt.id)}
                isCancelling={mutation.isPending}
              />
              <hr className="text-gray-300 mt-6 mb-4" />
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default MyAppointments;
