import { Link } from "react-router";
import { specialityData } from "../assets/assets_frontend/assets";

const Speciality = () => {
  return (
    <div className="flex flex-col items-center gap-20 my-40">
      <div className="text-center max-w-prose">
        <h2 className="text-[#1F2937] text-5xl font-medium font-outfit mb-4">
          Find by Speciality
        </h2>
        <p className="text-[#4B5563] text-lg">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {specialityData.map((speciality, index) => (
          <Link
            to={`/doctors?speciality=${speciality.speciality}`}
            className="cursor-pointer"
          >
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-4"
            >
              <img src={speciality.image} alt={speciality.name} />
              <h3 className="text-lg text-[#1F2937]">
                {speciality.speciality}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
