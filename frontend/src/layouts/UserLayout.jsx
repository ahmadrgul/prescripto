import { Outlet, useLocation } from "react-router"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

const UserLayout = () => {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
        {!isLoginOrRegister && <Nav />}
        <Outlet />
        {!isLoginOrRegister && <Footer />}
    </>
  )
}

export default UserLayout;