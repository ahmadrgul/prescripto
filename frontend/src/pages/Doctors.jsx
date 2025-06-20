import { useQuery } from "@tanstack/react-query";
import DoctorCard from "../components/DoctorCard";
import { fetchSpecializations } from "../api/specializations";
import { useState } from "react";
import { fetchDoctors } from "../api/doctor";

const Doctors = () => {
    const [ selectedSpec, setSelectedSpec ] = useState('');

    const {
        data: specs,
        isLoading: loadingSpecs,
        isError: isErrorSpecs,
        error: errorSpecs,
    } = useQuery({
        queryKey: ['specializations'],
        queryFn: () => fetchSpecializations(),
    })

    const {
        data: doctors,
        isLoading: loadingDoctors,
        isError: isErrorDoctors,
        error: errorDoctors,
    } = useQuery({
        queryKey: ['doctors', selectedSpec],
        queryFn: () => fetchDoctors(selectedSpec),
    })

    if (loadingSpecs || loadingDoctors) return <div>Loading...</div>
    if (isErrorSpecs || isErrorDoctors) return <div>Error: {errorSpecs || errorDoctors}</div>

  return (
    <main>
        <h3 className="mt-10 mb-6 text-xl text-[#4B5563] font-medium">Browse through the doctors specialization</h3>
        <div className="flex gap-10 mb-20">
            <aside className="flex flex-col gap-2" >
                {
                    specs.map((spec, index) => 
                         <input
                            key={index}
                            type="button" 
                            value={spec} 
                            className={`h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] ${selectedSpec == spec && "border-none bg-[#E2E5FF]"} cursor-pointer font-outfit`}
                            onClick={(e) => setSelectedSpec(e.target.value)}
                        />

                        )
                }     
            </aside>
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-10">
                {
                    doctors.results.map(doctor => (
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
        </div>
    </main>
  )
}

export default Doctors;