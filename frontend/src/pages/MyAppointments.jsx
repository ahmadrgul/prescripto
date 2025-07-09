import AppointmentCard from "../components/AppointmentCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment, getAppointments } from "../api/appointments";
import { useState } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import ErrorComponent from "../components/ErrorComponent";
import { motion } from "framer-motion";
import { handleAPIError } from "../utils/handleAPIError";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const MyAppointments = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState("scheduled");
  const { user, isAuthenticated } = useAuth();

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
    onError: handleAPIError,
  });

  if (user.role === "admin") return <p className="w-full flex items-center justify-center text-2xl text-gray-700">Sorry. This page is not intended for admin users.<Link to="/admin" className="text-blue-500">&nbsp;Navigate&nbsp;</Link>to Admin Panel</p>
  
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
        {!isAuthenticated ? (
          <div className="text-center text-xl">
            Please{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>{" "}
            to see your Appointments.
          </div>
        ) : isError ? (
          <ErrorComponent
            title={`Unable to load appointments: ${
              (error?.response?.data?.errors[0]?.code || error.message
            )}`}
            retry={refetch}
          />
        ) : isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
              >
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
        ) : data.count !== 0 ? (
          data.results.map((appt) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AppointmentCard
                apptId={appt.id}
                docId={appt.doctor.id}
                docImg={appt.doctor.image}
                docName={`Dr. ${appt.doctor.first_name} ${appt.doctor.last_name}`}
                docSpeciality={appt.doctor.speciality}
                docAddressLine1={appt.doctor.address_line1}
                docAddressLine2={appt.doctor.address_line2}
                docFee={appt.doctor.fee}
                apptDate={appt.appointment_date}
                apptTime={appt.appointment_time}
                apptStatus={appt.state}
                isPaid={appt.paid}
                cancelFn={() => mutation.mutate(appt.id)}
                isCancelling={mutation.isPending}
              />
              <hr className="text-gray-300 mt-6 mb-4" />
            </motion.div>
          ))
        ) : (
          <h1>No appointments found</h1>
        )}
      </div>
    </main>
  );
};

export default MyAppointments;
