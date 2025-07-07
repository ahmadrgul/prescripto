import DoctorCard from "./DoctorCard";
import { Link } from "react-router";
import { getTopDoctors } from "../api/doctor";
import { useQuery } from "@tanstack/react-query";
import DoctorCardSkeleton from "../skeletons/DoctorCardSkeleton";
import ErrorComponent from "../components/ErrorComponent";

const TopDocs = () => {
  const {
    data: topDocs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["top_doctors"],
    queryFn: getTopDoctors,
  });

  return (
    <div className="my-40 ">
      <div className="flex flex-col items-center gap-20">
        <div className="text-center ">
          <h2 className="text-[#1F2937] text-5xl font-medium font-outfit mb-4">
            Top Doctors to Book
          </h2>
          <p className="text-[#4B5563] text-lg">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>
      </div>
      <div className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-10 mt-20">
        {isError ? (
          <div className="flex items-center justify-center">
            <ErrorComponent
              title={
                "Unable to load doctors data: " +
                  (error?.response?.data?.errors[0]?.code || error.message)
              }
              retry={refetch}
            />
          </div>
        ) : isLoading ? (
          Array(4)
            .fill(0)
            .map((_, i) => <DoctorCardSkeleton key={i} />)
        ) : (
          topDocs.count === 0 ?
          <h1 className="text-center font-outfit text-gray-500 text-2xl">
                No Doctors found.
          </h1> :
          topDocs.results.map((doctor, index) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              img={doctor.image}
              name={"Dr. " + doctor.first_name + " " + doctor.last_name}
              speciality={doctor.speciality}
            />
          ))
        )}
      </div>
      <div className="mt-20 flex justify-center">
        <Link to="/doctors">
          <button className="bg-[#8f929c] cursor-pointer text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition duration-300">
            View All Doctors
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopDocs;
