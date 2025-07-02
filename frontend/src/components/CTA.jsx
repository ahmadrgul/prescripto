import { Link } from "react-router";
import appointment_img from "../assets/assets_frontend/appointment_img.png";
import Button from "./Button";
import { useAuth } from "../context/AuthContext"

const CTA = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row w-full my-40 bg-primary h-fit md:h-[455px] rounded-xl md:px-24">
      <div className="h-full p-4">
        <div className="h-full flex flex-col justify-center gap-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-white font-outfit leading-10 md:leading-20">
            Book Appointment With 100+ Trusted Doctors
          </h1>
          {
            isAuthenticated ? (
              <Link to="/doctors">
                  <Button
                    text="Book Appointment"
                    bgColor="white"
                    textColor="[#4B5563]"
                    className="hover:scale-105 transition-all"
                  />
              </Link>
            )
            : (
              <Link to="/register">
                <Button
                  text="Create Account"
                  bgColor="white"
                  textColor="[#4B5563]"
                  className="hover:scale-105 transition-all"
                />
              </Link>
            )
          }
        </div>
      </div>
      <div className="flex items-end w-full md:w-2/3">
        <img src={appointment_img} className="md:h-[529px]" />
      </div>
    </div>
  );
};

export default CTA;
