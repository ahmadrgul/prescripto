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

const App = () => {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className='max-w-fit mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60'>
      {!isLoginOrRegister && <Nav />} 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<Doctor />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      {!isLoginOrRegister && <Footer />}
    </div>
  )
}

export default App;
