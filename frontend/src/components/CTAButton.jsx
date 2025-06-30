import arrow from "../assets/assets_frontend/arrow_icon.svg";

const CTAButton = () => {
  return (
    <button className="bg-white hover:scale-105 duration-500 transition-all w-fit cursor-pointer font-outfit text-[#595959] text-lg rounded-full px-8 py-4 flex gap-2">
      Book Appointment
      <img src={arrow} />
    </button>
  );
};

export default CTAButton;
