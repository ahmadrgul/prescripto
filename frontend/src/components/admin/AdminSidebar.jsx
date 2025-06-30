import { assets } from "../../assets/assets_admin/assets";
import { NavLink } from "react-router";

const AdminSidebar = () => {
  const tabs = [
    {
      title: "Dashboard",
      icon: assets.home_icon,
      path: "dashboard",
    },
    {
      title: "Appointments",
      icon: assets.appointment_icon,
      path: "appointments",
    },
    {
      title: "Add Doctor",
      icon: assets.add_icon,
      path: "add_doctor",
    },
    {
      title: "Doctors List",
      icon: assets.people_icon,
      path: "doctors",
    },
    {
      title: "Patients",
      icon: assets.patient_icon,
      path: "patients",
    },
  ];

  return (
    <aside className="border-r border-[#BEBEBE] max-h-full min-h-screen">
      <ul className="pt-6 flex flex-col">
        {tabs.map((tab, index) => (
          <li key={index}>
            <NavLink
              to={`admin/${tab.path}`}
              className={({ isActive }) =>
                `flex cursor-pointer gap-3 items-end ${isActive ? "bg-[#F2F3FF] border-r-primary font-medium" : "border-r-transparent"} border-r-6  py-5 pl-6 pr-36`
              }
            >
              <img src={tab.icon} className="size-4" />
              <span className="text-[#515151] leading-3.5 font-outfit text-lg">
                {tab.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
