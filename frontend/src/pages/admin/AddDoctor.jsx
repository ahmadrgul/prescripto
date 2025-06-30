import { useRef, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useMutation } from "@tanstack/react-query";
import { createDoctor } from "../../api/doctor";
import { handleAPIError } from "../../utils/handleAPIError";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createDoctor,
    onSuccess: (data) => {
      toast.success(`${data.first_name} has been added as doctor.`);
      navigate("/admin/doctors");
    },
    onError: handleAPIError,
  });

  const [schedule, setSchedule] = useState([
    {
      weekday: 0,
      availabe: true,
      startTime: "10:00:00",
      endTime: "16:00:00",
      slotDuration: 20,
    },
    {
      weekday: 1,
      availabe: false,
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
    {
      weekday: 2,
      availabe: false,
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
    {
      weekday: 3,
      availabe: false,
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
    {
      weekday: 4,
      availabe: false,
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
    {
      weekday: 5,
      availabe: false,
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
    {
      weekday: 6,
      availabe: false,
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
  ]);

  const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(assets.upload_area);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("image", fileInputRef.current.files[0]);
    const clean_schedule = schedule
      .filter((obj) => obj.availabe)
      .map((obj) => ({
        weekday: obj.weekday,
        start_time: obj.startTime,
        end_time: obj.endTime,
        slot_duration: obj.slotDuration,
      }));
    formData.append("availability", JSON.stringify(clean_schedule));
    mutation.mutate(formData);
    console.log(formData.get("availability"));
  };

  return (
    <main className="p-10 font-outfit w-full">
      <h2 className="font-medium text-xl text-[#323232]">Add Doctor</h2>
      <div className="border border-[#D8D8D8] p-6 rounded-md mt-6 w-5xl">
        <form onSubmit={handleSubmit}>
          <div className="flex mb-6">
            <div className="flex gap-10 items-center cursor-pointer">
              <img
                src={image}
                alt="Profile"
                onClick={handleImageClick}
                className="rounded-full size-24 border-[#D8D8D8] border"
              />
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <label
                htmlFor="firstname"
                className="text-[#5D607D] text-lg w-36"
              >
                Upload doctor picture
              </label>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstname" className="text-[#5D607D] text-lg">
                  Doctor Firstname
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="John"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last_name" className="text-[#5D607D] text-lg">
                  Doctor Lastname
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Doe"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#5D607D] text-lg">
                  Doctor Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@prescripto.com"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[#5D607D] text-lg">
                  Doctor Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="experience" className="text-[#5D607D] text-lg">
                  Experience
                </label>
                <div className="border px-2 py-2 border-[#C1C1C1] rounded-md w-full">
                  <select
                    name="experience"
                    defaultValue="def"
                    id="experience"
                    className="w-full outline-none "
                  >
                    <option value="def" disabled>
                      Select Experience
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">5+</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="fee" className="text-[#5D607D] text-lg">
                  Fee
                </label>
                <input
                  type="number"
                  name="fee"
                  id="fee"
                  placeholder="100"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="speciality" className="text-[#5D607D] text-lg">
                  Speciality
                </label>
                <div className="border px-2 py-2 border-[#C1C1C1] rounded-md w-full">
                  <select
                    name="speciality"
                    defaultValue="def"
                    id="speciality"
                    className="w-full outline-none "
                  >
                    <option value="def" disabled>
                      Select Specialty
                    </option>
                    <option value="General Physician">General Physician</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Urology">Urology</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Rheumatology">Rheumatology</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="education" className="text-[#5D607D] text-lg">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  placeholder="FCPS"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="address_line1"
                  className="text-[#5D607D] text-lg"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address_line1"
                  id="address_line1"
                  placeholder="Dr. Ayesha Siddiqui, MBBS, FCPS"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
                <input
                  type="text"
                  name="address_line2"
                  id="address_line2"
                  placeholder="Suite #12, First Floor, Gulberg Plaza, Lahore"
                  className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <label htmlFor="description" className="text-[#5D607D] text-lg">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={6}
              placeholder="Write about doctor"
              className="border px-2 py-2 border-[#C1C1C1] outline-primary rounded-md w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <label className="text-[#5D607D] text-lg">Availability</label>
            <table className="border border-gray-200 w-full table-auto font-outfit text-center rounded-md">
              <thead className="text-md text-[#5D607D] border-b border-b-gray-200">
                <tr>
                  <th>Available</th>
                  <th className="px-4">Day</th>
                  <th className="px-4">From</th>
                  <th className="px-4">To</th>
                  <th className="px-4">Slot Duration</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((el, index) => (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={el.availabe}
                        onChange={() => {
                          const updated = [...schedule];
                          updated[index] = { ...el, availabe: !el.availabe };
                          setSchedule(updated);
                        }}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className={`${!el.availabe && "opacity-50"}`}>
                      {WEEKDAYS[el.weekday]}
                    </td>
                    <td>
                      <input
                        type="time"
                        value={el.startTime}
                        disabled={!el.availabe}
                        onChange={(e) => {
                          const updated = [...schedule];
                          updated[index] = { ...el, startTime: e.target.value };
                          setSchedule(updated);
                        }}
                        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-text outline-none"
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={el.endTime}
                        disabled={!el.availabe}
                        onChange={(e) => {
                          const updated = [...schedule];
                          updated[index] = { ...el, endTime: e.target.value };
                          setSchedule(updated);
                        }}
                        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-text outline-none"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={el.slotDuration}
                        placeholder="Minutes"
                        disabled={!el.availabe}
                        onChange={(e) => {
                          const updated = [...schedule];
                          updated[index] = {
                            ...el,
                            slotDuration: e.target.value,
                          };
                          setSchedule(updated);
                        }}
                        className="text-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <input
            type="submit"
            value="Add Doctor"
            className="bg-primary text-white mt-8 cursor-pointer w-fit py-3 px-7 rounded-full font-outfit text-lg flex items-center justify-center"
          />
        </form>
      </div>
    </main>
  );
};
export default AddDoctor;
