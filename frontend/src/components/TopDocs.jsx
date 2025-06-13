import { doctors } from "../assets/assets_frontend/assets";
import DoctorCard from "./DoctorCard";
import Button from "./Button";

const TopDocs = () => {
  return (
    <div className="my-40 ">
        <div className="flex flex-col items-center gap-20">
            <div className="text-center ">
                <h2 className="text-[#1F2937] text-5xl font-medium font-outfit mb-4">Top Doctors to Book</h2>
                <p className="text-[#4B5563] text-lg">Simply browse through our extensive list of trusted doctors.</p>
            </div>
        </div>
        <div className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-10 mt-20">
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
        <div className="mt-20 flex justify-center">
            <button
                className="bg-[#8f929c] text-white px-6 py-3 rounded-full font-medium hover:bg-primary transition duration-300"
            >View All Doctors</button>
        </div>
    </div>
  )
}

export default TopDocs;