import About from './components/About';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import PaymentConfirmation from './components/PaymentConfirmation';
import Invoice from "./components/Invoice";
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
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
          <Route path="/Reviews" element={
          <PrivateRoute>
            <Reviews />
          </PrivateRoute>} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Shop" element={
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        } />
        <Route path="/Checkout" element={<Checkout/>} />
        <Route path="/PaymentConfirmation" element={<PaymentConfirmation/>} />
        <Route path="/Invoice" element={<Invoice/>} />
        <Route path="/Dasboard" element={<Dashboard/>}/>
        <Route path="/products" element={<ProductList/>} />
        <Route path="/products/add" element={<ProductForm/>} />
        <Route path="/products/edit/:id" element={<ProductForm/>}/>
        <Route path="/orders" element={<OrderList/>} />
        <Route path="/orders/add" element={<OrderForm/>} />
        <Route path="/orders/edit/:id" element={<OrderForm/>} />
        <Route path="/reviewsadmin" element={<ReviewList/>} />
        <Route path="/reviewsadmin/add" element={<ReviewForm/>} />
        <Route path="/reviewsadmin/edit/:id" element={<ReviewForm/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
