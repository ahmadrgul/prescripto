import { Routes, Route, useLocation, Navigate } from 'react-router';
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
import PageTransitionWrapper from './components/PageTransitionWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css';


const ScrollToTop = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location.pathname]);

  return null;
}

const App = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route element={<UserLayout />}>
          <Route path='/' element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
          <Route path='/home' element={<PageTransitionWrapper><Navigate to="/" /></PageTransitionWrapper>} />
          <Route path='/doctors' element={<PageTransitionWrapper><Doctors /></PageTransitionWrapper>} />
          <Route path='/doctors/:id' element={<PageTransitionWrapper><Doctor /></PageTransitionWrapper>} />
          <Route path='/about' element={<PageTransitionWrapper><About /></PageTransitionWrapper>} />
          <Route path='/contact' element={<PageTransitionWrapper><Contact /></PageTransitionWrapper>} />
          <Route path='/login' element={<PublicOnlyRoute><PageTransitionWrapper><Login /></PageTransitionWrapper></PublicOnlyRoute>} />
          <Route path='/register' element={<PublicOnlyRoute><PageTransitionWrapper><Register /></PageTransitionWrapper></PublicOnlyRoute>} />
        </Route>
        <Route element={<AdminOnlyRoute><AdminLayout /></AdminOnlyRoute>}>
          <Route path='/admin' element={<PageTransitionWrapper><Navigate to="/admin/dashboard" /></PageTransitionWrapper>} />
          <Route path='/admin/dashboard' element={<PageTransitionWrapper><Dashboard /></PageTransitionWrapper>} />
          <Route path='/admin/add_doctor' element={<PageTransitionWrapper><AddDoctor /></PageTransitionWrapper>} />
          <Route path='/admin/doctors/:id' element={<PageTransitionWrapper><UpdateDoctor /></PageTransitionWrapper>} />
          <Route path='/admin/appointments' element={<PageTransitionWrapper><Appointments /></PageTransitionWrapper>} />
          <Route path='/admin/doctors' element={<PageTransitionWrapper><DoctorList /></PageTransitionWrapper>} />
          <Route path='/admin/patients' element={<PageTransitionWrapper><Patients /></PageTransitionWrapper>} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;
