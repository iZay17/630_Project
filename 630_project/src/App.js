import About from './components/About';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home';
import ElectronicList from './components/ElectronicList';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import './CPS630_Project.css';
import PrivateRoute from './PrivateRoute';


function App() {
  /*const [user, setUser] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);*/
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/ElectronicList" element={
          <PrivateRoute>
            <ElectronicList />
          </PrivateRoute>
        } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
