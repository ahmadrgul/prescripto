import { assets } from "../assets/assets_frontend/assets";

const ErrorComponent = ({
  title = "Oops! Something went wrong",
  message = "",
  retry = () => {},
}) => {
  return (
    <div className="w-full py-4 font-outfit flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col text-gray-700">
        <h2 className="text-xl font-medium">{title}</h2>
        <p>{message}</p>
      </div>
      <button
        onClick={retry}
        className="px-4 w-fit flex items-center gap-1 py-1 cursor-pointer box-shadow border border-gray-200 text-xl rounded-full"
      >
        <img 
          src={assets.retry_icon}
          className="size-6 -rotate-90 -scale-x-100"
        />
        Retry
      </button>
    </div>
  );
};

export default ErrorComponent;
