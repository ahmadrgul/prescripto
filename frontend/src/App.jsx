import { Routes, Route, useLocation, Navigate } from 'react-router';
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
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorList from './pages/admin/DoctorList';
import Appointments from './pages/admin/Appointments';
import Patients from './pages/admin/Patients';
import UpdateDoctor from './pages/admin/UpdateDoctor';
import AdminOnlyRoute from './routes/AdminOnlyRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';


const ScrollToTop = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
}

const App = () => {

  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:id' element={<Doctor />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
          <Route path='/register' element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        </Route>
        <Route element={<AdminOnlyRoute><AdminLayout /></AdminOnlyRoute>}>
          <Route path='/admin' element={<Navigate to="/admin/dashboard" />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/add_doctor' element={<AddDoctor />} />
          <Route path='/admin/doctors/:id' element={<UpdateDoctor />} />
          <Route path='/admin/appointments' element={<Appointments />} />
          <Route path='/admin/doctors' element={<DoctorList />} />
          <Route path='/admin/patients' element={<Patients />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
