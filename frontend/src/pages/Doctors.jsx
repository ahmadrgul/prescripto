import { useQuery } from "@tanstack/react-query";
import { fetchSpecializations } from "../api/specializations";
import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctor";
import { useSearchParams } from "react-router";
import DoctorCard from "../components/DoctorCard";
import DoctorCardSkeleton from "../skeletons/DoctorCardSkeleton";
import SpecializationSkeleton from "../skeletons/SpecializationSkeleton";
import ErrorComponent from "../components/ErrorComponent";
import { motion } from "framer-motion";

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const specialityParam = searchParams.get("speciality") || "";
  const [selectedSpec, setSelectedSpec] = useState("");

  const {
    data: specs,
    isLoading: loadingSpecs,
    isError: isErrorSpecs,
    error: errorSpecs,
    refetch: refetchSpecs,
  } = useQuery({
    queryKey: ["specializations"],
    queryFn: () => fetchSpecializations(),
  });

  const {
    data: doctors,
    isLoading: loadingDoctors,
    isError: isErrorDoctors,
    error: errorDoctors,
    refetch: refetchDoctors,
  } = useQuery({
    queryKey: ["doctors", specialityParam],
    queryFn: () => getDoctors(specialityParam),
  });

  useEffect(() => {
    setSelectedSpec(specialityParam);
  }, [specialityParam]);

  return (
    <main>
      <h3 className="mt-10 mb-6 text-xl text-[#4B5563] font-medium">
        Browse through the doctors specialization
      </h3>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-20">
        <aside className="flex flex-col gap-2">
          {isErrorSpecs ? (
            <div className="flex items-center justify-center">
              <ErrorComponent
                title={
                  "Unable to load specializations: " +
                    (errorSpecs?.response?.data?.errors[0]?.code ||
                  errorSpecs.message)
                }
                retry={refetchSpecs}
              />
            </div>
          ) : loadingSpecs ? (
            Array(5)
              .fill(0)
              .map((_, i) => <SpecializationSkeleton key={i} />)
          ) : (
            specs.results.map((spec, index) => (
              <input
                key={index}
                type="button"
                value={spec.speciality}
                className={`h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] ${selectedSpec == spec.speciality && "border-none bg-[#E2E5FF]"} cursor-pointer font-outfit`}
                onClick={() =>
                  setSearchParams(
                    spec.speciality ? { speciality: spec.speciality } : {},
                  )
                }
              />
            ))
          )}
        </aside>
        <div className="grid place-items-center-safe w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-10">
          {isErrorDoctors ? (
            <div className="flex items-center justify-center">
              <ErrorComponent
                title={
                  "Unable to load doctors data: " +
                    (errorDoctors?.response?.data?.errors[0]?.code ||
                  errorDoctors.message)
                }
                retry={refetchDoctors}
              />
            </div>
          ) : loadingDoctors ? (
            Array(8)
              .fill(0)
              .map((_, i) => <DoctorCardSkeleton key={i} />)
          ) : (
            doctors.count === 0 ?
            <h1 className="text-center font-outfit text-gray-500 text-2xl">
                No Doctors found.
            </h1> :
            doctors.results.map((doctor) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DoctorCard
                  key={doctor.id}
                  id={doctor.id}
                  img={doctor.image}
                  name={"Dr. " + doctor.first_name + " " + doctor.last_name}
                  speciality={doctor.speciality}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Doctors;
