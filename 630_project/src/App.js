import About from './components/About';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Home from './components/Home';
import ElectronicList from './components/ElectronicList';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import './CPS630_Project.css';


function App() {
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/ElectronicList" element={<ElectronicList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
