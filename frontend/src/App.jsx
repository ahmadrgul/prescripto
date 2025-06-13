import { Routes, Route } from 'react-router';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctor from './pages/Doctor';

const App = () => {
  return (
    <div className='max-w-fit mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors/:id' element={<Doctor />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;