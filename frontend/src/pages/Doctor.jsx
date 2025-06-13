import { useParams } from "react-router";
import DoctorCard from "../components/DoctorCard";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById } from "../api/doctor";

export const Doctor = () => {
  const { id } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => fetchDoctorById(id),
    enabled: !!id,
  })

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <main className="pt-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <div className="w-full md:w-72 overflow-visible flex items-end bg-primary rounded-lg ">
            <img 
              src={doctor.image}
              alt={doctor.name}
              className=""
            />
          </div>
        </div>
        <div className="h-full">
          <div className="h-full border border-gray-300 rounded-lg py-8 px-6">
            <h1 className="text-3xl text-[#1F2937] font-outfit font-medium mb-1">{doctor.first_name + ' ' + doctor.last_name}</h1>
            <div>
              <h2 className="font-outfit text-lg mr-4 text-[#4B5563] inline">{doctor.education} - {doctor.specialization}</h2>
              <span className="border border-[#4B5563] p-1.5 text-xs text-[#4B5563] rounded-full">{doctor.experience} Years</span>
            </div>
            <div className="mt-4">
              <h3 className="font-outfit text-[#1F2937]">About <span className="text-black  font-semibold">&#9432;</span></h3>
              <p className="my-2 text-[#4B5563] font-outfit">{doctor.description}</p>
            </div>
            <div className="mt-4">
                <p className="text-lg text-[#4B5563] font-outfit">Appointment fee: <span className="font-medium">${doctor.fee}</span></p>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-[#565656] text-2xl font-outfit font-medium">Booking Slots</h2>
            <div className="mt-5 flex gap-5 flex-wrap">
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">MON <br/> 10</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">TUE <br/> 11</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">WED <br/> 12</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">THU <br/> 13</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">MON <br/> 10</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">TUE <br/> 11</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">WED <br/> 12</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-6 hover:drop-shadow-md hover:drop-shadow-primary px-3.5 rounded-full">THU <br/> 13</div>
            </div>
            <div className="flex gap-5 my-5 flex-wrap">
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full">8:00 am</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full">9:00 am</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full">10:00 am</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full">8:00 am</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full">9:00 am</div>
              <div className="hover:bg-primary border border-gray-300 hover:border-none text-center hover:text-gray-100 text-[#4B5563] font-medium font-outfit py-2 hover:drop-shadow-md hover:drop-shadow-primary px-6 rounded-full">10:00 am</div>
            </div>
            <button className="bg-primary mt-10 text-xl text-center text-gray-100 font-medium font-outfit py-4 drop-shadow-md drop-shadow-primary px-8 rounded-full">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <div className="my-40 ">
        <div className="flex flex-col items-center gap-20">
            <div className="text-center ">
                <h2 className="text-[#1F2937] text-5xl font-medium font-outfit mb-4">Related Doctors</h2>
                <p className="text-[#4B5563] text-lg">Simply browse through our extensive list of trusted doctors.</p>
            </div>
        </div>
        {/* <div className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-10 mt-20">
            {
                doctors.slice(0,4).map((doctor, index) => (
                    <DoctorCard 
                        img={doctor.image}
                        name={doctor.name}
                        speciality={doctor.speciality}
                    />
                ))
            }
        </div> */}
    </div>
    </main>
  )
}

export default Doctor;