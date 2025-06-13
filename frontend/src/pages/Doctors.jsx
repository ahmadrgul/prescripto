import { doctors } from "../assets/assets_frontend/assets";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  return (
    <main>
        <h3 className="mt-10 mb-6 text-xl text-[#4B5563] font-medium">Browse through the doctors specialization</h3>
        <div className="flex gap-10 mb-20">
            <aside className="flex flex-col gap-2" >
                <input type="button" value="Pediatricians" className="h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] active:border-none cursor-pointer active:bg-[#E2E5FF] font-outfit"/>
                <input type="button" value="Cardiologists" className="h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] active:border-none cursor-pointer active:bg-[#E2E5FF] font-outfit"/>
                <input type="button" value="Dermatologists" className="h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] active:border-none cursor-pointer active:bg-[#E2E5FF] font-outfit"/>
                <input type="button" value="Neurologists" className="h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] active:border-none cursor-pointer active:bg-[#E2E5FF] font-outfit"/>
                <input type="button" value="Orthopedic Surgeons" className="h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] active:border-none cursor-pointer active:bg-[#E2E5FF] font-outfit"/>
                <input type="button" value="Psychiatrists" className="h-12 w-60 border border-[#B4B4B4] rounded-lg text-[#4B5563] active:border-none cursor-pointer active:bg-[#E2E5FF] font-outfit"/>
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