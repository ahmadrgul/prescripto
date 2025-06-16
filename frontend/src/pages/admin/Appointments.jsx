import { assets } from "../../assets/assets_admin/assets"
import { assets as fassets } from "../../assets/assets_frontend/assets"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

const Appointments = () => {


  const data = [
    {
      number: 1,
      patient_avatar: fassets.profile_pic,
      patient_name: 'Richard James',
      department: 'Nuerology',
      age: 32,
      date: 'July 24th, 2025. 10 A.M',
      doctor_name: 'Dr. Richard James',
      doctor_avatar: fassets.profile_pic,
      fee: '$50',
      status: 'Scheduled'
    },
    {
      number: 2,
      patient_avatar: fassets.profile_pic,
      patient_name: 'Richard James',
      department: 'Nuerology',
      age: 32,
      date: 'July 24th, 2025. 10 A.M',
      doctor_name: 'Dr. Richard James',
      doctor_avatar: fassets.profile_pic,
      fee: '$50',
      status: 'Completed'
    },
    {
      number: 3,
      patient_avatar: fassets.profile_pic,
      patient_name: 'Richard James',
      department: 'Nuerology',
      age: 32,
      date: 'July 24th, 2025. 10 A.M',
      doctor_name: 'Dr. Richard James',
      doctor_avatar: fassets.profile_pic,
      fee: '$50',
      status: 'Cancelled'
    }
  ]

  const columns = [
    {
      header: '#',
      accessorKey: 'number',
    },
    {
      header: 'Patient',
      accessorKey: 'patient_name',
      cell: ({ row }) => {
        const patient = row.original;
        return (
          <div className="flex gap-2 items-center">
            <img 
              src={patient.patient_avatar}
              alt={patient.patient_name}
              className="rounded-full size-8"
            />
            <span>{patient.patient_name}</span>
          </div>
        )
      }
    },
    {
      header: 'Department',
      accessorKey: 'department',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Date & Time',
      accessorKey: 'date',
    },
    {
      header: 'Doctor',
      accessorKey: 'doctor_name',
      cell: ({ row }) => {
        const doctor = row.original;
        return (
          <div className="flex gap-2 items-center">
            <img 
              src={doctor.doctor_avatar}
              alt={doctor.doctor_name}
              className="rounded-full size-8"
            />
            <span>{doctor.doctor_name}</span>
          </div>
        )
      }
    },
    {
      header: 'Fee',
      accessorKey: 'fee',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
