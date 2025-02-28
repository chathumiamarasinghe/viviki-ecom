import './App.css';
import { BrowserRouter, Route, Navigate, Routes, } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import {CartProvider} from './component/context/CartContext';
import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryProductsPage from './component/pages/CategoryProductsPage';


function App() {
  return (
   <BrowserRouter>
   <CartProvider>
    <Navbar/>
    <Routes>
      {/* OUR ROUTES */}
      <Route exact path='/' element={<Home/>}/>
      <Route path='/product/:productId' element={<ProductDetailsPage/>} />
      <Route path='/categories' element={<CategoryListPage/>}/>
      <Route path='/category/:categoryId' element={<CategoryProductsPage/>} />
    </Routes>
    <Footer/>
   </CartProvider>
   </BrowserRouter>
  );
}

export default App;