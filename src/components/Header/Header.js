import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import { BiUser } from "react-icons/bi";
import { BsCart,BsSearch } from "react-icons/bs";
import { AiFillMinusCircle,AiFillPlusCircle } from "react-icons/ai";
import './Header.css'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { getAuth, signOut } from 'firebase/auth';


const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   
    const [user,setUser] = useState({
        isSingnedIn : false,
        userName : '',
        email : '',
        password : '',
        errorMessage : '',
        successMessage: '',
        profileImage : '',
      })

      const {cart, onAdd, onRemove, countCartItems} = props;
      const productPrice = cart.reduce((a,c)=> a+ c.price * c.qty, 0);

      const shippingCost = productPrice> 2000 ? 30 : 50;
      const totalPrice =  productPrice + shippingCost;
    const history = useHistory();
    const handleCartClick = ()=>{
        history.push(`/cart`);
    }

    const handleLogin =()=>{
        history.push(`/login`)
    }

    const handleProfile =()=>{
        history.push(`/profile`)
    }

    const handleSearch = e => {
        const search = e.target.value
        history.push(`/search/${search}`)
    }

    const handleSignOut = () => {
        const auth = getAuth();
        return signOut(auth).then(() => {
            const signedOutUser = {
                isSingnedIn : false,
                userName : '',
                email : '',
                password : '',
                errorMessage : '',
                successMessage: '',
                profileImage : '',
            }

            setUser(signedOutUser);
            setLoggedInUser(signedOutUser);
            history.push(`/login`)
            history.go(0)
        }).catch((error) => {
            console.log(error);
        });
    }
    
    
    return (
        
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow mb-2 text-uppercase fixed-top" >
                <div className="container">
                    
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand responsive" to="/">
                        <img src={logo} alt="logo" height='50' />
                    </Link>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto   mt-2 mb-lg-0">
                            <li className="nav-item ">
                                <Link className="nav-link nav-text" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-text" to="shop">Shop</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link nav-text" to="admin">Admin</Link>
                            </li>
                        </ul>
                        
                                    <div className="input-box ms-auto ">
                        <button className='search-icon'><BsSearch/></button><input type="text" onChange={handleSearch} className="search-input"  placeholder="type to search..."/>
                        </div>
                        <div class="dropdown">
                        <span className='cart-style me-2' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><BsCart/><span className='cart-count'>{props.countCartItems ? props.countCartItems : ''}</span></span>
                        {/* <span className='user-icon-style' onClick={handleLogin}><BiUser/></span> */}
                            {
                                cart.length===0 ?
                                <div class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenuButton1"><p className='text-center text-info'>Cart is empty</p></div>
                                
                                :
                                <div class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenuButton1">
                                <div style={{width:'550px'}}>
                                    <table class="table table-borderless">
                                        <thead className='border'>
                                            <tr>
                                                <th className='product-name-font'>Product Name</th>
                                                <th  className='product-name-font'>Price</th>
                                                <th  className='product-name-font'>Quantity</th>
                                                <th  className='product-name-font'>Total</th>
                                            </tr>
                                        </thead>
                                        
                                        {
                                        cart.map(cartItem => 
                                        <tbody>
                                            <tr >
                                                <td><img src={cartItem.image} alt="image" className=' me-1 img-fluid' width='35' /><span className='product-name-font fw-bold'>{cartItem.name} ({cartItem.amount} pieces)</span></td>
                                                <td className='product-name-font'>৳ {cartItem.price}</td>
                                                <td className='product-name-font'>{cartItem.qty}</td>
                                                <td className='product-name-font'>৳ {cartItem.price * cartItem.qty}</td>
                                            </tr>
                                        </tbody>
                                        )
                                        } 
                                    </table>
                                    <div className='d-flex justify-content-end m-2'>
                                        <button className='btn btn-sm btn-success' onClick={handleCartClick}>Go to Cart</button>
                                    </div>
                                </div>
                            </div>
                            }
                        
                        </div>
                        <div class="dropdown">
                            <span className="user-icon-style dropdown-toggle d-flex align-items-center" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            <BiUser/>
                            </span>
                            <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownMenuButton2">
                                {
                                    loggedInUser.isSingnedIn ?
                                    <div>
                                    <li><Link class="dropdown-item" to="/profile" onClick={handleProfile}>{loggedInUser.userName}</Link></li>
                                    <li><Link class="dropdown-item" to="/login" onClick={handleSignOut}>Log Out</Link></li>
                                    </div>
                                    :
                                    <li><Link class="dropdown-item" to="/login" onClick={handleLogin}>Log In</Link></li>

                                }
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
           
        
    );
};

export default Header;