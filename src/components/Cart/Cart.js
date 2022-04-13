import React from 'react';
import Header from '../Header/Header';
import { FiMinusSquare,FiPlusSquare } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import './Cart.css';
import { useHistory } from 'react-router-dom';

const Cart = (props) => {
    const {cart, onAdd, onRemove, removeCart} = props;
    const productPrice = cart.reduce((a,c)=> a+ c.price * c.qty, 0);
    const shippingCost = productPrice> 2000 ? 30 : 50;
    const totalPrice =  productPrice + shippingCost;

    const history = useHistory();
    
    const handleCheckout = () => {
        history.push('/shipment')
    }
    
    return (
        <div>
            <div className='container mt-5'>
                <div className="row">
                    
                        {
                            
                            cart.length===0 ?
                            <div><h5 className='text-center text-info'>Cart is empty</h5></div>
                            
                     :
                     <div>
                        <div>
                            <table class="table table-borderless border">
                                <thead className='border'>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                {
                                cart.map(cartItem => 
                                <tbody>
                                    <tr>
                                        <td><img src={cartItem.image} alt="image" className='bg-light me-2 p-1' width='60' /><b>{cartItem.name} ({cartItem.amount} pieces)</b></td>
                                        <td>৳ {cartItem.price}</td>
                                        <td><button className='btn btn-sm btn-light border' onClick={()=>onRemove(cartItem)}>-</button> {cartItem.qty} <button className='btn btn-sm btn-light border' onClick={()=>onAdd(cartItem)}>+</button></td>
                                        <td>৳ {cartItem.price * cartItem.qty}</td>
                                        <span style={{cursor:'pointer', fontSize:'20px'}} onClick={()=>removeCart(cartItem)}><AiFillDelete/></span>
                                        
                                    </tr>
                                </tbody>
                                  )
                                }
                                <tbody className='border'>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><b>Shipping Cost</b></td>
                                        <td>৳ {shippingCost}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><b>Grand Total</b></td>
                                        <td>৳ {totalPrice}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-success' onClick={handleCheckout}>Proceed to Checkout</button>
                        </div>
                      </div>
                    }
                </div>

            </div>
            
        </div>
    );
};

export default Cart;