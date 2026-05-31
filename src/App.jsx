import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Navbar from "./Component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Component/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import { useCart } from "./Context/CartContext";
import ProtectedRoute from "./Component/ProtectedRoute";
const App = () => {
  const [location, setlocation] = useState();
   const [openDropdown, setOpenDropdown] = useState(false)
   const { cartItem, setCartItem } = useCart()


  const getlocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
       
        
        const exactlocation = location.data.address;
        setlocation(exactlocation);
        setOpenDropdown(false);
        
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getlocation();
    
  }, []);

   //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem]);

  return (
    <BrowserRouter>
      <Navbar location={location} getlocation={getlocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path='/product/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<ProtectedRoute><Cart location={location} getlocation={getlocation} /></ProtectedRoute>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
