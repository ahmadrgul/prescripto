import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { completeAppointment, getAppointments } from "../../api/appointments";
import { differenceInYears, format, parseISO, parse } from "date-fns";
import Skeleton from "react-loading-skeleton";
import ErrorComponent from "../../components/ErrorComponent";
import { Link } from "react-router";
import { capitalCaseOneWord } from "../../utils/text";
import { toast } from "react-toastify";
import { handleAPIError } from "../../utils/handleAPIError"

const formatCustomDate = (date) => {
  date = parse(date, "yyyy-MM-dd HH:mm:ss", new Date())
  return format(date, "do MMMM, yyyy | h:mm a");
};

const getAge = (isoDB) => {
  const dob = parseISO(isoDB);
  return differenceInYears(new Date(), dob);
};

const Appointments = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: completeAppointment,
    onSuccess: (data) => {
      toast.success("Appointment has been marked completed");
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: handleAPIError,
  })

  const columns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Patient",
      accessorKey: "patient_name",
      cell: ({ row }) => {
        const patient = row.original.patient;
        return (
          <div className="flex gap-2 items-center">
            <img
              src={patient.image}
              alt={patient.first_name}
              className="rounded-full size-8"
            />
            <span>
              {capitalCaseOneWord(patient.first_name) + " " + capitalCaseOneWord(patient.last_name)}
            </span>
          </div>
        );
      },
    },
    {
      header: "Department",
      cell: ({ row }) => row.original.doctor.speciality,
    },
    {
      header: "Age",
      cell: ({ row }) => getAge(row.original.patient.birthday),
    },
    {
      header: "Date & Time",
      cell: ({ row }) => formatCustomDate(`${row.original.appointment_date} ${row.original.appointment_time}`),
    },
    {
      header: "Doctor",
      cell: ({ row }) => {
        const doctor = row.original.doctor;
        return (
          <Link to={`/admin/doctors/${doctor.id}`} className="flex gap-2 items-center">
            <img
              src={doctor.image}
              alt={doctor.first_name_name}
              className="rounded-full size-8"
            />
            <span>
              {"Dr. " + capitalCaseOneWord(doctor.first_name) + " " + capitalCaseOneWord(doctor.last_name)}
            </span>
          </Link>
        );
      },
    },
    {
      header: "Fee",
      cell: ({ row }) => `$${row.original.doctor.fee}`,
    },
    {
      header: "Status",
      cell: ({ row }) => (
      <button 
        className={`cursor-pointer ${statusColorMap[row.original.state]}`}
        onClick={() => mutation.mutate(row.original.id)}
        disabled={row.original.state==="completed"}
      >
          {
            row.original.state.charAt(0).toUpperCase() +
            row.original.state.slice(1).toLowerCase()
          }
      </button>)
    },
  ];

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const statusColorMap = {
    cancelled: "text-red-500",
    scheduled: "text-blue-500",
    completed: "text-green-500",
  };

  return (
    <main className="p-10 w-full">
      <h2 className="font-medium font-outfit text-xl text-[#323232]">
        All Appointments
      </h2>
      <table className="border border-gray-200 rounded-lg w-full table-auto font-outfit text-left mt-6">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-lg">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-[#323232] px-4 py-2 border-b border-b-gray-200"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isError ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                <ErrorComponent
                  title={
                    "Unable to load appointments: " +
                      (error?.response?.data?.errors[0]?.code || error.message)
                  }
                  retry={refetch}
                />
              </td>
            </tr>
          ) : isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <tr 
                  key={i}
                >
                  {columns.map((_, i) => (
                    <td 
                      key={i}
                      className="px-4 py-4"
                    >
                      <Skeleton height={12} width={80} />
                    </td>
                  ))}
                </tr>
              ))
          ) : data.count !== 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-[#696B80] text-lg">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-lg py-4 text-gray-500"
              >
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Appointments;
