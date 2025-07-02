import { Outlet, useLocation } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const UserLayout = () => {
  const location = useLocation();
  const showNav = location.pathname !== "/login" && location.pathname !== "/register"
  const showFooter = location.pathname !== "/login" && location.pathname !== "/doctors" && location.pathname !== "/register" && location.pathname !== "/me" && location.pathname !== "/appointments";

  return (
    <div className="mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60">
      {showNav && <Nav />}
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default UserLayout;
