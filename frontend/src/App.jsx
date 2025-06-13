import { Routes, Route } from 'react-router';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Doctor from './pages/Doctor';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <div className='max-w-fit mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<Doctor />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;