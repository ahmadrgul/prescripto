import AdminDoctorCard from "../../components/admin/AdminDoctorCard"
import { fetchDoctors } from "../../api/doctor"
import { useQuery } from "@tanstack/react-query"

const DoctorList = () => {
  const {
      data: doctors,
      isLoading: loadingDoctors,
      isError: isErrorDoctors,
      error: errorDoctors,
  } = useQuery({
      queryKey: ['doctors'],
      queryFn: () => fetchDoctors(),
  })

  if (loadingDoctors) return <div>Loading...</div>
  if (errorDoctors) return <div>Error: {errorDoctors}</div>

  return (
    <main className="p-10 w-full">
      <h2 className="font-medium font-outfit text-xl text-[#323232]">All Doctors</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            doctors.count != 0 ? 
            doctors.results.map((doctor, index) => (
                <AdminDoctorCard 
                    key={doctor.id}
                      id={doctor.id}
                      img={doctor.image}
                      name={"Dr. " + doctor.first_name + " " + doctor.last_name}
                      speciality={doctor.specialization}
                />
            )) : <p>No doctors found.</p>
        }
      </div>
    </main>
  )
}

export default DoctorList;
