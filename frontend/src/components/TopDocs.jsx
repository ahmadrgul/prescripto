import DoctorCard from "./DoctorCard";
import { Link } from "react-router";
import { getTopDoctors } from "../api/doctor";
import { useQuery } from "@tanstack/react-query";
import DoctorCardSkeleton from "../skeletons/DoctorCardSkeleton";


const TopDocs = () => {
  const {
      data: topDocs,
      isLoading,
      isError,
      error,
  } = useQuery({
      queryKey: ['top_doctors'],
      queryFn: () => getTopDoctors(),
  })

  if (isError) return <div>Error Occurred</div>


  return (
    <div className="my-40 ">
        <div className="flex flex-col items-center gap-20">
            <div className="text-center ">
                <h2 className="text-[#1F2937] text-5xl font-medium font-outfit mb-4">Top Doctors to Book</h2>
                <p className="text-[#4B5563] text-lg">Simply browse through our extensive list of trusted doctors.</p>
            </div>
        </div>
        <div className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-10 mt-20">
            {   isLoading ?
                Array(4).fill(0).map((_, i) => <DoctorCardSkeleton key={i} />) :
                topDocs.results.map((doctor, index) => (
                    <DoctorCard 
                        key={doctor.id}
                        id={doctor.id}
                        img={doctor.image}
                        name={"Dr. " + doctor.first_name + " " + doctor.last_name}
                        speciality={doctor.speciality}
                    />
                ))
            }
        </div>
        <div className="mt-20 flex justify-center">
            <Link to="/doctors">
                <button
                    className="bg-[#8f929c] cursor-pointer text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition duration-300"
                >
                    View All Doctors
                </button>
            </Link>
        </div>
    </div>
  )
}

export default TopDocs;