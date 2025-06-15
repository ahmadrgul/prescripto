import AdminDoctorCard from "../../components/admin/AdminDoctorCard"
import { doctors } from "../../assets/assets_frontend/assets"

const DoctorList = () => {
  return (
    <main className="p-10">
      <h2 className="font-medium font-outfit text-xl text-[#323232]">All Doctors</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            doctors?.length ? doctors.map((doctor, index) => (
                <AdminDoctorCard 
                    key={doctor._id || index}
                    id={doctor._id}
                    img={doctor.image}
                    name={doctor.name}
                    speciality={doctor.speciality}
                />
            )) : <p>No doctors found.</p>
        }
      </div>
    </main>
  )
}

export default DoctorList;
