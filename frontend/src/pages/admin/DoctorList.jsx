import AdminDoctorCard from "../../components/admin/AdminDoctorCard"
import { getDoctors } from "../../api/doctor"
import { useQuery } from "@tanstack/react-query"
import DoctorCardSkeleton from "../../skeletons/DoctorCardSkeleton"
import ErrorComponent from "../../components/ErrorComponent"

const DoctorList = () => {
  const {
      data: doctors,
      isLoading,
      isError,
      error,
      refetch,
  } = useQuery({
      queryKey: ['doctors'],
      queryFn: () => getDoctors(),
  })

  return (
    <main className="p-10 w-full">
      <h2 className="font-medium font-outfit text-xl text-[#323232]">All Doctors</h2>
      {
        isError ?
        <div className="flex items-center justify-center">
          <ErrorComponent 
            title={"Unable to load doctors data: " + error?.response?.data?.errors[0]?.code || error.message}
            retry={refetch}
          />
        </div> :
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {   
            isLoading ?
            Array(8).fill(0).map((_, i) => <DoctorCardSkeleton key={i} />) : 
            doctors.count > 0 ? 
            doctors.results.map((doctor, index) => (
                <AdminDoctorCard 
                    key={doctor.id}
                      id={doctor.id}
                      img={doctor.image}
                      name={"Dr. " + doctor.first_name + " " + doctor.last_name}
                      speciality={doctor.speciality}
                />
            )) : <h1 className="text-center font-outfit text-gray-500 text-lg">No Doctors Found.</h1>
          }
        </div>
      }
    </main>
  )
}

export default DoctorList;
