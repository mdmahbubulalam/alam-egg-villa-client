import './App.css';
import Home from './components/Home/Home';
import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Auth/Login/Login';
import SignUp from './components/Auth/SignUp/SignUp';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import OrderList from './components/AdminPanel/OrderList/OrderList';
import Admin from './components/AdminPanel/Admin';
import ProductsInfo from './components/AdminPanel/ProductsInfo/ProductsInfo';
import AddProduct from './components/AdminPanel/ProductsInfo/AddProduct/AddProduct';
import ManageProduct from './components/AdminPanel/ProductsInfo/ManageProduct/ManageProduct';
import UpdateProduct from './components/AdminPanel/ProductsInfo/UpdateProduct/UpdateProduct';
import UpdateShipment from './components/Shipment/UpdateShipment';
import Orders from './components/Orders/Orders';
import OrderSuccessMessage from './components/AdminPanel/OrderList/OrderSuccessMessage';
import Profile from './components/Auth/Profile/Profile';
import OrderDetails from './components/AdminPanel/OrderDetails/OrderDetails';
import AdminUser from './components/AdminPanel/AdminUser/AdminUser';
import MakeAdmin from './components/AdminPanel/MakeAdmin/MakeAdmin';
import ManageComments from './components/AdminPanel/ManageComments/ManageComments';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Dashboard from './components/AdminPanel/Dashboard/Dashboard';
import NoMatch from './components/NoMatch/NoMatch';


export const UserContext = createContext()
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || []

function App() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [cart,setCart] = useState(cartFromLocalStorage);
  const [products, setProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  const [discountPrice, setDiscountPrice] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({})

  const url = 'https://boiling-escarpment-47375.herokuapp.com/products'

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data =>{data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
     setProducts(data)} )
  },[])

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data =>{data.sort((a,b) => b.discount - a.discount)
      setDiscountPrice(data)} )
  },[])

  

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => setOldProducts(data))
  },[])

  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  const allAdminUserUrl = 'https://boiling-escarpment-47375.herokuapp.com/adminUsers'
  useEffect(() => {
    fetch(allAdminUserUrl)
    .then(res => res.json())
    .then(data => setAdminUsers(data))
  },[])


  const onAdd = (product) => {
  
    const exist = cart.find(cartId => cartId._id === product._id)
    if(exist){
      setCart(cart.map(cartId => cartId._id === product._id ? {...exist, qty:exist.qty+1}: cartId))
    }else{
      setCart([...cart, {...product, qty:1}])
    }
  }

  const onRemove = (product) => {
    const exist = cart.find(cartId => cartId._id === product._id)
    if(exist.qty===1){
      setCart(cart.filter(cartId => cartId._id !== product._id));
    }else{
      setCart(cart.map(cartId => cartId._id === product._id ? {...exist, qty:exist.qty-1}: cartId))
    }
  }

  const removeCart = (product)  => {
    setCart(cart.filter(cartId => cartId._id !== product._id))
  }

  const clearCart =() => {
    setCart([])
  }

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser ]} >
    <Router>
      <Header countCartItems={cart.length} onAdd={onAdd} onRemove={onRemove} cart={cart} />
     
      
      <Switch>
      
          <Route path="/home">
            <Home onAdd={onAdd} products={products} discountPrice={discountPrice} oldProducts={oldProducts} />
          </Route>
          <Route path="/shop">
            <Shop onAdd={onAdd}/>
          </Route>
          <Route path="/search/:search">
            <Search products={products} onAdd={onAdd}/>
          </Route>
          <Route path="/cart">
            <Cart onAdd={onAdd} onRemove={onRemove} cart={cart} removeCart={removeCart}  />
          </Route>
          <Route path="/details=:productId">
            <ProductDetails cart={cart} onRemove={onRemove} onAdd={onAdd} />
          </Route>
          <Route path="/login">
            <Login  adminUsers={adminUsers} />
          </Route>
          <Route path="/signup">
            <SignUp  />
          </Route>
          <PrivateRoute path="/profile">
            <Profile  />
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <PrivateRoute path="/updateShipment/:shipmentId">
            <UpdateShipment />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders cart={cart} clearCart={clearCart}/>
          </PrivateRoute>
          <PrivateRoute path="/orderSuccessMessage">
            <OrderSuccessMessage/>
          </PrivateRoute>
          <PrivateRoute path="/orderDetails/:orderId">
            <OrderDetails/>
          </PrivateRoute>
          <Route exact path="/">
            <Home onAdd={onAdd} products={products} discountPrice={discountPrice} oldProducts={oldProducts} />
          </Route>
          {
            !loggedInUser.isSingnedIn &&
            <PrivateRoute path="/admin">
              <Admin/>
          </PrivateRoute>
          }
          
          {
            adminUsers.map(adminUser => 
            (loggedInUser.email ===  adminUser.adminEmail) &&
            <Switch>
              <PrivateRoute path="/admin">
              <Admin/>
              </PrivateRoute>
              <Route path="/orderList">
                <OrderList/>
              </Route>
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
              <Route path="/productsInfo">
                <ProductsInfo/>
              </Route>
              <Route path="/addProduct">
                <AddProduct/>
              </Route>
              <Route path="/manageProduct">
                <ManageProduct products={products}/>
              </Route>
              <Route path="/adminUser">
                <AdminUser />
              </Route>
              <Route path="/makeAdmin">
                <MakeAdmin />
              </Route>
              <Route path="/manageComments">
                <ManageComments />
              </Route>
              <Route path="/updateProduct/:productId">
                <UpdateProduct />
              </Route>
            </Switch>
            )
          }
         
          <Route path = "*">
              <NoMatch />
          </Route>
        </Switch>
        <Footer/>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
