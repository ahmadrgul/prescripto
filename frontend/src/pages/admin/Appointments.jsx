import { useQuery } from "@tanstack/react-query"
// import { assets } from "../../assets/assets_admin/assets"
import { assets as fassets } from "../../assets/assets_frontend/assets"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { getAppointments } from "../../api/appointments"
import { differenceInYears, format, parseISO } from "date-fns"

const formatCustomDate = (isoData) => {
  const data = parseISO(isoData)
  return format(data, "do MMMM, yyyy. h:mm a")
}

const getAge = (isoDB) => {
  const dob = parseISO(isoDB)
  return differenceInYears(new Date(), dob)
}

const Appointments = () => {

  // const data = [
  //   {
  //     number: 1,
  //     patient_avatar: fassets.profile_pic,
  //     patient_name: 'Richard James',
  //     department: 'Nuerology',
  //     age: 32,
  //     date: 'July 24th, 2025. 10 A.M',
  //     doctor_name: 'Dr. Richard James',
  //     doctor_avatar: fassets.profile_pic,
  //     fee: '$50',
  //     status: 'Scheduled'
  //   },
  //   {
  //     number: 2,
  //     patient_avatar: fassets.profile_pic,
  //     patient_name: 'Richard James',
  //     department: 'Nuerology',
  //     age: 32,
  //     date: 'July 24th, 2025. 10 A.M',
  //     doctor_name: 'Dr. Richard James',
  //     doctor_avatar: fassets.profile_pic,
  //     fee: '$50',
  //     status: 'Completed'
  //   },
  //   {
  //     number: 3,
  //     patient_avatar: fassets.profile_pic,
  //     patient_name: 'Richard James',
  //     department: 'Nuerology',
  //     age: 32,
  //     date: 'July 24th, 2025. 10 A.M',
  //     doctor_name: 'Dr. Richard James',
  //     doctor_avatar: fassets.profile_pic,
  //     fee: '$50',
  //     status: 'Cancelled'
  //   }
  // ]

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  })

  
  const columns = [
    // {
    //   header: '#',
    //   accessorKey: 'number',
    // },
    {
      header: 'Patient',
      accessorKey: 'patient_name',
      cell: ({ row }) => {
        const patient = row.original.patient;
        return (
          <div className="flex gap-2 items-center">
            <img 
              src={fassets.profile_pic}
              alt={patient.first_name}
              className="rounded-full size-8"
            />
            <span>{patient.first_name.charAt(0).toUpperCase() + patient.first_name.slice(1).toLowerCase() + ' ' + patient.last_name.charAt(0).toUpperCase() + patient.last_name.slice(1).toLowerCase()}</span>
          </div>
        )
      }
    },
    {
      header: 'Department',
      cell: ({ row }) => row.original.doctor.speciality
    },
    {
      header: 'Age',
      cell: ({ row }) => getAge(row.original.patient.birthday)
    },
    {
      header: 'Date & Time',
      cell: ({ row }) => formatCustomDate(row.original.appointment_date)
    },
    {
      header: 'Doctor',
      cell: ({ row }) => {
        const doctor = row.original.doctor;
        return (
          <div className="flex gap-2 items-center">
            <img 
              src={fassets.profile_pic}
              alt={doctor.first_name_name}
              className="rounded-full size-8"
            />
            <span>{doctor.first_name.charAt(0).toUpperCase() + doctor.first_name.slice(1).toLowerCase() + ' ' + doctor.last_name.charAt(0).toUpperCase() + doctor.last_name.slice(1).toLowerCase()}</span>
          </div>
        )
      }
    },
    {
      header: 'Fee',
      cell: ({ row }) => `$${row.original.doctor.fee}`,
    },
    {
      header: 'Status',
      cell: ({ row }) => row.original.state.charAt(0).toUpperCase() + row.original.state.slice(1).toLowerCase()
    }
  ]

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  
  console.log(data)

  return (
    <main className="p-10 w-full">
      <h2 className="font-medium font-outfit text-xl text-[#323232]">All Appointments</h2>
      <table className="border border-gray-200 rounded-lg w-full table-auto font-outfit text-left mt-6">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="text-lg">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-[#323232] px-4 py-2 border-b border-b-gray-200">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="text-[#696B80] text-lg">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Appointments;
