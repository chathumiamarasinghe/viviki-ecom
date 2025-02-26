import './App.css';
import { BrowserRouter, Route, Navigate, Routes, } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import {CartProvider} from './component/context/CartContext';
import Home from './component/pages/Home';


function App() {
  return (
   <BrowserRouter>
   <CartProvider>
    <Navbar/>
    <Routes>
      {/* OUR ROUTES */}
      <Route exact path='/' element={<Home/>}/>
    </Routes>
    <Footer/>
   </CartProvider>
   </BrowserRouter>
  );
}

export default App;