import { Routes, Route, useLocation } from 'react-router';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Doctor from './pages/Doctor';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import Dashboard from './pages/admin/Dashboard';
import AddDoctor from './pages/admin/AddDoctor';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

const ScrollToTop = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
}

const App = () => {

  return (
    <div className='max-w-fit mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60'>
      <ScrollToTop /> 
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:id' element={<Doctor />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/add_doctor' element={<AddDoctor />} />
          {/* <Route path='/admin/appointments' element={<Appointments />} /> */}
          {/* <Route path='/admin/doctors' element={<DoctorsList />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App;
