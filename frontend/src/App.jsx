import Nav from './components/Nav';
import Hero from './components/Hero';
import Specialty from './components/Speciality';
import TopDocs from './components/TopDocs';
import CTA from './components/CTA';

const App = () => {
  return (
    <div className='px-60'>
      <Nav />
      <Hero />
      <Specialty />
      <TopDocs />
      <CTA />
    </div>
  )
}

export default App;