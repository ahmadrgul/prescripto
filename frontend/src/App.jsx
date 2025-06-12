import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='px-60'>
      <Nav />
      <Home />
      <Footer />
    </div>
  )
}

export default App;