import { Link } from "react-router";

const DoctorCard = ({ id, img, name, speciality }) => {
  return (
    <Link to={`/doctors/${id}`}>
      <div className="group h-96 w-72 border-gray-300 border rounded-xl cursor-pointer">
        <div className="flex items-end bg-[#EAEFFF] rounded-t-xl group-hover:bg-primary transition-all ease-in-out duration-500">
          <img src={img} />
        </div>
        <div className="px-4">
          <p className="text-[#0FBF00] flex items-center gap-1 font-outfit">
            <span className="text-3xl inline">&bull;</span> Available
          </p>
          <h3 className="text-xl font-medium text-[#1F2937] leading-0 py-3 font-outfit">
            {name}
          </h3>
          <p className="text-[#4B5563]  font-outfit">{speciality}</p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
