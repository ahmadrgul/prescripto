import { Outlet, useLocation } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const UserLayout = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/login" && location.pathname !== "/register"
  const showFooter = location.pathname !== "/login" && location.pathname !== "/doctors" && location.pathname !== "/register" && location.pathname !== "/me" && location.pathname !== "/appointments";

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[96rem] mx-1 sm:mx-4 md:mx-8">
        {showNav && <Nav />}
        <Outlet />
        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default UserLayout;
