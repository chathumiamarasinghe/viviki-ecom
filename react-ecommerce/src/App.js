import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe's loadStripe function
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/CartContext';
import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import ProductListPage from './component/pages/ProductListPage';
import CategoryProductsPage from './component/pages/CategoryProductsPage';
import CartPage from './component/pages/CartPage';
import RegisterPage from './component/pages/RegisterPage';
import LoginPage from './component/pages/LoginPage';
import ProfilePage from './component/pages/ProfilePage';
import AddressPage from './component/pages/AddressPage';
import AdminPage from './component/admin/AdminPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import AddCategory from './component/admin/AddCategory';
import EditCategory from './component/admin/EditCategory';
import AdminProductPage from './component/admin/AdminProductPage';
import AddProductPage from './component/admin/AddProductPage';
import EditProductPage from './component/admin/EditProductPage';
import AdminOrdersPage from './component/admin/AdminOrderPage';
import AdminOrderDetailsPage from './component/admin/AdminOrderDetailsPage';
import CheckoutButton from './component/pages/CheckoutButton'; // Your CheckoutButton component
import CategoryChart from './component/admin/CategoryChart';
import OrderChart from './component/admin/OrderChart';
import AdminMaterialPage from './component/admin/AdminMaterialPage';
import AddMaterialPage from './component/admin/AddMaterialPage';
import EditMaterialPage from './component/admin/EditMaterialPage';
import CategorySection from './component/pages/CategorySection';
import DeliveryPersonPage from './component/deliveryperson/DeliveryPerson';
import InventoryManagerPage from './component/inventorymanager/InventoryManager';
import AdminUserPage from './component/admin/AdminUserPage';
import AddUser from './component/admin/AddUser';

// Stripe public key
const stripePromise = loadStripe('pk_test_51R20BrQuQy8aXxhAx1DlRKKigcryCTHcdVG6Re0qtmEb6Gzs0zf83Ibd5LE8IPy3qB3BDEaIH8mCXFc9hOwLIB4W0015O3VX9l'); // Replace with your Stripe public key

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar/>
        <Elements stripe={stripePromise}> {/* Wrap your CheckoutButton with Elements */}
          <Routes>
            {/* OUR ROUTES */}
            <Route exact path='/' element={<Home/>}/>
            <Route path='/product/:productId' element={<ProductDetailsPage/>} />
            <Route path='/categories' element={<CategoryListPage/>}/>
            <Route path='/products' element={<ProductListPage/>}/>
            <Route path='/category/:categoryId' element={<CategoryProductsPage/>} />
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/checkout' element={<CheckoutButton/>}/> {/* CheckoutButton inside Elements */}
            <Route path='/CategoryChart' element={<CategoryChart/>}/>
            <Route path='/OrderChart' element={<OrderChart/>}/>
            <Route path='/category-section' element={<CategorySection />} />

            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/add-address' element={<AddressPage/>} />
            <Route path='/edit-address' element={<AddressPage/>} />

            {/* ADMIN ROUTES */}
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/admin/users' element={<AdminUserPage/>} />
            <Route path='/admin/add-user' element={<AddUser/>} />
            
            {/* INVENTORY MANAGER & ADMIN ROUTES */}
            <Route path='/admin/add-product' element={<AddProductPage />} />
            <Route path='/admin/edit-product/:productId' element={<EditProductPage />} />
            <Route path='/admin/products' element={<AdminProductPage />} />
            <Route path='/admin/add-category' element={<AddCategory />} />
            <Route path='/admin/categories' element={<AdminCategoryPage />} />
            <Route path='/admin/edit-category/:categoryId' element={<EditCategory />} />
            <Route path='/admin/materials' element={<AdminMaterialPage />} />
            <Route path='/admin/add-material' element={<AddMaterialPage />} />
            <Route path='/admin/edit-material/:materialId' element={<EditMaterialPage />} />

            <Route path='/admin/orders' element={<AdminOrdersPage/>} />
            <Route path='/admin/order-details/:itemId' element={<AdminOrderDetailsPage/>} />

            {/* INVENTORY MANAGER ROUTES */}
            <Route path='/manager' element={<InventoryManagerPage/>} />
            
            {/* DELIVERY PERSON ROUTES */}
            <Route path='/delivery' element={<DeliveryPersonPage/>} />
            <Route path='/delivery/orders' element={<AdminOrdersPage />} />
            <Route path='/delivery/order-details/:itemId' element={<AdminOrderDetailsPage />} />
          </Routes>
        </Elements> {/* End of Elements provider */}
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
