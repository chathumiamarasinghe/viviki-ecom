import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute, InventoryManagerRoute, DeliveryPersonRoute, AdminOrInventoryManagerRoute, AdminOrDeliveryPersonRoute } from './service/Guard';
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
import CheckoutButton from './component/pages/CheckoutButton';
import CategoryChart from './component/admin/CategoryChart';
import OrderChart from './component/admin/OrderChart';
import AdminMaterialPage from './component/admin/AdminMaterialPage';
import AddMaterialPage from './component/admin/AddMaterialPage';
import EditMaterialPage from './component/admin/EditMaterialPage';
import CategorySection from './component/pages/CategorySection';
import DeliveryPersonPage from './component/deliveryperson/DeliveryPerson';
import InventoryManagerPage from './component/inventorymanager/InventoryManager';


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
          <Route path='/products' element={<ProductListPage/>}/>
          <Route path='/category/:categoryId' element={<CategoryProductsPage/>} />
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/checkout' element={<CheckoutButton/>}/>
          <Route path='/CategoryChart' element={<CategoryChart/>}/>
          <Route path='/OrderChart' element={<OrderChart/>}/>
          <Route path='/category-section' element={<CategorySection />} />
      

          <Route path='/profile' element={<ProtectedRoute element={<ProfilePage/>} />} />
          <Route path='/add-address' element={<ProtectedRoute element={<AddressPage/>} />} />
          <Route path='/edit-address' element={<ProtectedRoute element={<AddressPage/>} />} />


          {/* ADMIN ROUTES */}
          <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
          {/*<Route path='/admin/categories' element={<AdminRoute element={<AdminCategoryPage/>} />} />
          <Route path='/admin/add-category' element={<AdminRoute element={<AddCategory/>} />} />
          <Route path='/admin/edit-category/:categoryId' element={<AdminRoute element={<EditCategory/>} />} />
          <Route path='/admin/products' element={<AdminRoute element={<AdminProductPage/>} />} />
          <Route path='/admin/add-product' element={<AdminRoute element={<AddProductPage/>} />} />
          <Route path='/admin/edit-product/:productId' element={<AdminRoute element={<EditProductPage/>} />} />
          <Route path='/admin/materials' element={<AdminRoute element={<AdminMaterialPage/>} />} />
          <Route path='/admin/add-material' element={<AdminRoute element={<AddMaterialPage/>} />} />
          <Route path='/admin/edit-material/:materialId' element={<AdminRoute element={<EditMaterialPage/>} />} />*/}
          
          {/* INVENTORY MANAGER & ADMIN ROUTES */}
          <Route path='/admin/add-product' element={<AdminOrInventoryManagerRoute element={<AddProductPage />} />} />
          <Route path='/admin/edit-product/:productId' element={<AdminOrInventoryManagerRoute element={<EditProductPage />} />} />
          <Route path='/admin/products' element={<AdminOrInventoryManagerRoute element={<AdminProductPage />} />} />
          <Route path='/admin/add-category' element={<AdminOrInventoryManagerRoute element={<AddCategory />} />} />
          <Route path='/admin/categories' element={<AdminOrInventoryManagerRoute element={<AdminCategoryPage />} />} />
          <Route path='/admin/edit-category/:categoryId' element={<AdminOrInventoryManagerRoute element={<EditCategory />} />} />
          <Route path='/admin/materials' element={<AdminOrInventoryManagerRoute element={<AdminMaterialPage />} />} />
          <Route path='/admin/add-material' element={<AdminOrInventoryManagerRoute element={<AddMaterialPage />} />} />
          <Route path='/admin/edit-material/:materialId' element={<AdminOrInventoryManagerRoute element={<EditMaterialPage />} />} />

          {/* DELIVERY PERSON & ADMIN ROUTES 
          <Route path='/admin/orders' element={<AdminOrDeliveryPersonRoute element={<AdminOrdersPage />} />} />
          <Route path='/admin/order-details/:itemId' element={<AdminOrDeliveryPersonRoute element={<AdminOrderDetailsPage />} />} />*/}

          <Route path='/admin/orders' element={<AdminRoute element={<AdminOrdersPage/>} />} />
          <Route path='/admin/order-details/:itemId' element={<AdminRoute element={<AdminOrderDetailsPage/>} />} />


          {/* INVENTORY MANAGER ROUTES */}
          <Route path='/manager' element={<InventoryManagerRoute element={<InventoryManagerPage/>} />} />
          {/*<Route path='/manager/products' element={<InventoryManagerRoute element={<AdminProductPage />} />} />
          <Route path='/manager/add-product' element={<InventoryManagerRoute element={<AddProductPage />} />} />
          <Route path='/manager/edit-product/:productId' element={<InventoryManagerRoute element={<EditProductPage />} />} />
          <Route path='/manager/materials' element={<InventoryManagerRoute element={<AdminMaterialPage />} />} />
          <Route path='/manager/add-material' element={<InventoryManagerRoute element={<AddMaterialPage />} />} />
          <Route path='/manager/edit-material/:materialId' element={<InventoryManagerRoute element={<EditMaterialPage />} />} />
          <Route path='/manager/categories' element={<InventoryManagerRoute element={<AdminCategoryPage />} />} />
          <Route path='/manager/add-category' element={<InventoryManagerRoute element={<AddCategory />} />} />
          <Route path='/manager/edit-category/:categoryId' element={<InventoryManagerRoute element={<EditCategory />} />} />*/}

          {/* DELIVERY PERSON ROUTES */}
          <Route path='/delivery' element={<DeliveryPersonRoute element={<DeliveryPersonPage/>} />} />
          <Route path='/delivery/orders' element={<DeliveryPersonRoute element={<AdminOrdersPage />} />} />
          <Route path='/delivery/order-details/:itemId' element={<DeliveryPersonRoute element={<AdminOrderDetailsPage />} />} />

          
        </Routes>
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;