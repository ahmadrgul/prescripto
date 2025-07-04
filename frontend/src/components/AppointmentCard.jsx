import { Link } from "react-router";
import { converToVerboseDate, time24ToTime12 } from "../utils/dates";
import { capitalCaseOneWord } from "../utils/text";
import { ClipLoader } from "react-spinners";
import { media } from "../utils/endpoints"

const AppointmentCard = ({
  docId,
  docImg,
  docName,
  docSpeciality,
  docAddressLine1,
  docAddressLine2,
  apptDate,
  apptTime,
  apptStatus,
  isPaid,
  isCancelling,
  cancelFn,
}) => {
  const statusColorMap = {
    cancelled: "text-red-500",
    scheduled: "text-blue-500",
    completed: "text-green-500",
  };

  return (
    <div className="flex gap-4 font-outfit">
      <Link to={`/doctors/${docId}`}>
        <div className="w-52 h-52 flex items-end bg-[#EAEFFF]">
          <img src={`${media(docImg)}`} />
        </div>
      </Link>
      <div className="flex flex-col justify-between w-2/3">
        <div>
          <Link to={`/doctors/${docId}`}>
            <h2 className="text-[#262626] w-fit hover:underline text-2xl font-medium">
              {docName}
            </h2>
          </Link>
          <Link to={`/doctors?speciality=${docSpeciality}`}>
            <p className="text-[#4B5563] w-fit hover:underline transition-all text-lg">
              {docSpeciality}
            </p>
          </Link>
        </div>
        <div className="text-[#4B5563]">
          <h4 className="text-xl font-medium mb-1">Address</h4>
          <p className="text-lg">{docAddressLine1}</p>
          <p className="text-lg">{docAddressLine2}</p>
        </div>
        <div className="flex gap-2 text-lg">
          <h5 className="font-medium text-[#4B5563]">Date & Time:</h5>
          <span className="text-[#989898] flex gap-1">
            <p>{converToVerboseDate(apptDate)}</p>
            <p>|</p>
            <p>{time24ToTime12(apptTime)}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <span
          className={`text-lg text-end border w-fit px-2 rounded-full ${statusColorMap[apptStatus]}`}
        >
          {capitalCaseOneWord(apptStatus)}
        </span>
        <div className="flex flex-col gap-2 justify-end">
          <button
            disabled={isPaid}
            className={`${apptStatus === "cancelled" && "hidden"} bg-primary disabled:cursor-not-allowed w-72 h-12 rounded-sm text-white cursor-pointer`}
          >
            {isPaid ? "Paid" : "Pay here"}
          </button>
          <button
            disabled={!(apptStatus === "scheduled" || isCancelling)}
            className="border border-[#BABABA] w-72 h-12 rounded-sm text-[#4B5563] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={cancelFn}
          >
            {isCancelling ? (
              <div>
                <ClipLoader size={20} color="#fff" />
                Cancelling...
              </div>
            ) : (
              "Cancel Appointment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
