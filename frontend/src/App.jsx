import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='max-w-fit mx-auto px-4 sm:px-8 md:px-20 lg:px-32 xl:px-60'>
      <Nav />
      <Home />
      <Footer />
    </div>
  )
}

export default App;