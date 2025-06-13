import { useQuery } from "@tanstack/react-query";
import { doctors } from "../assets/assets_frontend/assets";
import DoctorCard from "../components/DoctorCard";
import { fetchSpecializations } from "../api/specializations";
import { useState } from "react";

const Doctors = () => {

    const [ selectedSpec, setSelectedSpec ] = useState();

    const {
        data: specs,
        isLoading: loadingSpecs,
        isError: isErrorSpecs,
        error: errorSpecs,
    } = useQuery({
        queryKey: ['specializations'],
        queryFn: () => fetchSpecializations(),
    })

    if (loadingSpecs) return <div>Loading...</div>
    if (isErrorSpecs) return <div>Erro: {errorSpecs}</div>
    console.log(selectedSpec)

  return (
    <main>
        <h3 className="mt-10 mb-6 text-xl text-[#4B5563] font-medium">Browse through the doctors specialization</h3>
        <div className="flex gap-10 mb-20">
            <aside className="flex flex-col gap-2" >
                {
                    specs.data.map((spec, index) => 
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
            <div className="grid w-full place-items-center grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-10">
                {
                    doctors.map((doctor, index) => (
                        <DoctorCard 
                            img={doctor.image}
                            name={doctor.name}
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