import { Link } from "react-router";
import { converToVerboseDate, time24ToTime12 } from "../utils/dates";
import { capitalCaseOneWord } from "../utils/text";
import { ClipLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { checkout } from "../api/checkout"
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const AppointmentCard = ({
  apptId,
  docId,
  docImg,
  docName,
  docSpeciality,
  docAddressLine1,
  docAddressLine2,
  docFee,
  apptDate,
  apptTime,
  apptStatus,
  isPaid,
  isCancelling,
  cancelFn,
}) => {
  const statusColorMap = {
    pending: "text-red-500",
    scheduled: "text-blue-500",
    completed: "text-green-500",
    cancelled: "text-gray-300",
  };

  const mutation = useMutation({
    mutationFn: checkout,
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (result.error) {
        toast.error(result.error.message);
      }
    },
    onError: (error) => {
      console.error(error)
    },
  });
                           
  return (
    <div className="flex gap-4 font-outfit">
      <Link to={`/doctors/${docId} `}>
        <div className="w-52 h-52 min-[500px]:flex hidden items-end bg-[#EAEFFF]">
          <img src={docImg} />
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
        <div className="flex flex-col gap-2 text-lg">
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
            className={`${apptStatus === "cancelled" && "hidden"} bg-primary disabled:cursor-default max-[950px]:block hidden h-12 rounded-sm text-white cursor-pointer`}
            onClick={!isPaid ? () => mutation.mutate(apptId) : undefined}
          >
            {isPaid ? "Paid" : `Pay Fee — $${docFee}`}
          </button>
          <button
            disabled={!(apptStatus === "scheduled" || apptStatus === "pending" || isCancelling)}
            className="border border-[#BABABA] max-[950px]:block hidden h-12 rounded-sm text-[#4B5563] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={cancelFn}
          >
            {isCancelling ? (
              <div>
                <ClipLoader size={20} color="#fff" />
              </div>
            ) : (
              "X"
            )}
          </button>
          <button
            disabled={isPaid}
            className={`${apptStatus !== "cancelled" && "min-[950px]:block"} bg-primary disabled:cursor-default hidden w-72 h-12 rounded-sm text-white cursor-pointer`}
            onClick={!isPaid ? () => mutation.mutate(apptId) : undefined}
          >
            {isPaid ? "Paid" : `Pay Fee — $${docFee}`}
          </button>
          <button
            disabled={!(apptStatus === "scheduled" || apptStatus === "pending" || isCancelling)}
            className="border border-[#BABABA] hidden min-[950px]:block w-72 h-12 rounded-sm text-[#4B5563] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
