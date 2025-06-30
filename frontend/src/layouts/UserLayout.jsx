import { Outlet, useLocation } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const UserLayout = () => {
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="max-w-fit mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60">
      {!isLoginOrRegister && <Nav />}
      <Outlet />
      {!isLoginOrRegister && <Footer />}
    </div>
  );
};

export default UserLayout;
