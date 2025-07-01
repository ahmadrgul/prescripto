import generateSlots from "../utils/generateSlots";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDoctorById, getScheduleById, getTopDoctors } from "../api/doctor";
import ErrorComponent from "../components/ErrorComponent";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { parseISO, getDate, format, parse } from "date-fns";
import { createAppointment } from "../api/appointments";
import { toast } from "react-toastify";
import { handleAPIError } from "../utils/handleAPIError";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import DoctorCard from "../components/DoctorCard";
import DoctorCardSkeleton from "../skeletons/DoctorCardSkeleton";

export const Doctor = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [selectedSchedule, setSelectedSchedule] = useState({
    weekday: 0,
    start_time: "00:00:00",
    end_time: "23:59:59",
    slot_duration: 60,
    slots: [],
  });
  const [selectedTime, setSelectedTime] = useState();

  const {
    data: doctor,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  });

  const {
    data: schedule,
    isLoading: isLoadingSchedule,
    isError: isErrorSchedule,
    error: errorSchedule,
    refetch: refetchSchedule,
    isSuccess: isSuccessSchedule,
  } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createAppointment,
    onError: handleAPIError,
    onSuccess: (data) => {
      toast.success(`The appointment has been booked successfully.`);
    },
  });

  const {
    data: relatedDocs,
    isLoading: isLoadingDocs,
    isError: isErrorDocs,
    error: errorDocs,
    refetch: refetchDocs,
  } = useQuery({
    queryKey: ["top-doctors"],
    queryFn: getTopDoctors,
  });

  useEffect(() => {
    if (isSuccessSchedule) {
      setSelectedSchedule(schedule[0]);
    }
  }, [isSuccessSchedule]);

  const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error(
        `Please login to book an appointment with Dr. ${doctor.first_name}`,
      );
    } else
      mutation.mutate({
        doctor: id,
        appointment_time: selectedTime,
        appointment_date: selectedSchedule.date,
      });
  };

  return (
    <main>
      {isError || isErrorSchedule ? (
        <ErrorComponent
          title={`Unable to load doctor data: ${error?.response?.data?.errors[0]?.code || error?.message || errorSchedule?.response?.data?.errors[0]?.code || errorSchedule?.message}`}
          retry={() => {
            refetch();
            refetchSchedule();
          }}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          <div className={`${isLoading && "w-1/3"}`}>
            {isLoading ? (
              <Skeleton className="h-72" width="100%" />
            ) : (
              !isError && (
                <div className="w-full md:w-72 h-72 overflow-visible flex items-end bg-primary rounded-lg ">
                  <img src={doctor.image} alt={doctor.name} />
                </div>
              )
            )}
          </div>
          <div className="h-full w-full">
            {isLoading ? (
              <div className="h-full w-full border border-gray-300 rounded-lg py-8 px-6">
                <Skeleton width={250} height={20} />
                <div>
                  <Skeleton width={70} height={12} />
                </div>
                <div className="mt-4">
                  <Skeleton width={100} height={12} className="mb-2" />
                  <Skeleton height={12} />
                  <Skeleton height={12} />
                  <Skeleton height={12} />
                  <Skeleton height={12} />
                </div>
                <div className="mt-4">
                  <Skeleton width={100} height={18} className="mb-2" />
                </div>
              </div>
            ) : (
              <div className="h-full border border-gray-300 rounded-lg py-8 px-6">
                <h1 className="text-3xl text-[#1F2937] font-outfit font-medium mb-1">
                  {doctor.first_name + " " + doctor.last_name}
                </h1>
                <div>
                  <h2 className="font-outfit text-lg mr-4 text-[#4B5563] inline">
                    {doctor.education} - {doctor.speciality}
                  </h2>
                  <span className="border border-[#4B5563] p-1.5 text-xs text-[#4B5563] rounded-full">
                    {doctor.experience} Years
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-outfit text-[#1F2937]">
                    About{" "}
                    <span className="text-black  font-semibold">&#9432;</span>
                  </h3>
                  <p className="my-2 text-[#4B5563] font-outfit">
                    {doctor.description}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-lg text-[#4B5563] font-outfit">
                    Appointment fee:{" "}
                    <span className="font-medium">${doctor.fee}</span>
                  </p>
                </div>
              </div>
            )}
            <div className="mt-10">
              <h2 className="text-[#565656] text-2xl font-outfit font-medium">
                Booking Slots
              </h2>
              <div className="mt-5 flex gap-5 flex-wrap transition-all">
                {isLoadingSchedule ? (
                  <>
                    <Skeleton width={70} height={90} circle />
                    <Skeleton width={70} height={90} circle />
                    <Skeleton width={70} height={90} circle />
                    <Skeleton width={70} height={90} circle />
                    <Skeleton width={70} height={90} circle />
                    <Skeleton width={70} height={90} circle />
                  </>
                ) : (
                  schedule.map((item, index) => (
                    <button
                      key={index}
                      className={`hover:bg-primary transition-all ${item.weekday === selectedSchedule.weekday && "bg-primary border-transparent text-gray-100 drop-shadow-md drop-shadow-primary"} border cursor-pointer border-gray-300 hover:border-transparent hover:text-gray-100 text-[#4B5563] font-medium font-outfit hover:drop-shadow-md hover:drop-shadow-primary h-24 text-center gap-4 flex flex-col justify-center items-center w-16 rounded-full`}
                      onClick={() => setSelectedSchedule(item)}
                    >
                      {WEEKDAYS[item.weekday]}
                      <br />
                      {getDate(parseISO(item.date))}
                    </button>
                  ))
                )}
              </div>
              <div className="flex gap-5 my-5 flex-wrap relative">
                {isLoadingSchedule
                  ? Array(20)
                      .fill(0)
                      .map((_, i) => <Skeleton width={70} height={40} circle />)
                  : selectedSchedule.slots.map((time) => (
                      <motion.div
                        key={time}
                        layout
                        transition={{
                          layout: {
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          },
                        }}
                      >
                        <button
                          className={`hover:bg-primary transition-all border cursor-pointer ${
                            time === selectedTime
                              ? "bg-primary border-transparent text-gray-100 drop-shadow-md drop-shadow-primary"
                              : "border-gray-300 text-[#4B5563]"
                          } hover:border-transparent text-center hover:text-gray-100 font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {format(parse(time, "HH:mm", new Date()), "hh:mm a")}
                        </button>
                      </motion.div>
                    ))}
              </div>
              <button
                disabled={!selectedTime}
                className="bg-primary disabled:bg-gray-400 disabled:opacity-50 disabled:drop-shadow-none disabled:cursor-not-allowed cursor-pointer mt-10 text-xl text-center text-white font-medium font-outfit py-4 drop-shadow-md drop-shadow-primary px-8 rounded-full"
                onClick={handleBooking}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="my-40 ">
        <div className="flex flex-col items-center gap-20">
          <div className="text-center ">
            <h2 className="text-[#1F2937] text-5xl font-medium font-outfit mb-4">
              Related Doctors
            </h2>
            <p className="text-[#4B5563] text-lg">
              Simply browse through our extensive list of trusted doctors.
            </p>
          </div>
        </div>
        <div className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-10 mt-20">
          {isErrorDocs ? (
            <ErrorComponent
              title={`Unable to load related doctors data: ${errorDocs?.response?.data?.errors[0]?.code || errorDocs.message}`}
              retry={refetchDocs}
            />
          ) : isLoadingDocs ? (
            Array(4)
              .fill(0)
              .map((_, i) => <DoctorCardSkeleton key={i} />)
          ) : (
            relatedDocs.results.map((doctor, index) => (
              <DoctorCard
                id={doctor.id}
                img={doctor.image}
                name={doctor.first_name + " " + doctor.last_name}
                speciality={doctor.speciality}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Doctor;
