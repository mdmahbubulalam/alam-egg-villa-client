import React, { useState } from 'react';
import './Products.css'
import { BsCart, BsSearch } from "react-icons/bs";
import { useHistory } from 'react-router-dom';


const Products = (props) => {
    const {products, onAdd, discountPrice, oldProducts } = props;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const recentProducts = products.slice(0,4);
    const olderProducts = oldProducts.slice(0,4);
    const maxDiscount = discountPrice.slice(0,4);

    
    
    const history = useHistory();
    const handleProductDetails =(productId)=> {
        history.push(`/details=${productId}`)
      }
    return (
        <div className='container'>
            <div className=" row ">
                <h3 className='text-center mt-5'>New Products</h3>
            {
               recentProducts.map(product => 
                <div className='product-card col-lg-3 col-md-6 col-sm-12 col-12 '>
                    <div className='single-card'>
                        <div className='text-center image'>
                            <img src={product.image} alt="image" className='w-75 img-responsove'/>
                        </div>
                        <div className='text-center pb-2'>
                            <p>
                               <span className='name-text'>{product.productName}</span> <br />
                               <span className='amount-text'>{product.amount} pieces</span> <br />
                               <span className='price-text'>৳ {product.price}</span><br />
                               {
                                product.discount>0 &&
                                <span>      
                                <small className='text-muted text-decoration-line-through'>৳ {product.keyPrice}</small>  <small><b>-{product.discount}%</b></small>       
                                </span>
                            }
      
                            </p>
                           
                            
                        </div>
                    </div>
                    <div className='details'>
                        <button className='search-btn me-2' onClick={()=>handleProductDetails(product._id)}><BsSearch/></button>
                        <button className='cart-btn' onClick={()=>onAdd(product)}><BsCart/></button>
                    </div> 
                </div>

                )    
            }
            </div>

            <div className=" row ">
                <h3 className='text-center mt-5'>Discount Price</h3>
            {
               maxDiscount.map(product => product.discount>0 &&
                <div className='product-card col-lg-3 col-md-6 col-sm-12 col-12'>
                    <div className='single-card'>
                        <div className='text-center image'>
                            <img src={product.image} alt="image" className='w-75'/>
                        </div>
                        <div className='text-center pb-2'>
                            <p>
                               <span className='name-text'>{product.productName}</span> <br />
                               <span className='amount-text'>{product.amount} pieces</span> <br />
                               <span className='price-text'>৳ {product.price}</span><br />  
                                <small className='text-muted text-decoration-line-through'>৳ {product.keyPrice}</small>  <small><b>-{product.discount}%</b></small>       
                            </p>
                        </div>
                    </div>
                    <div className='details'>
                        <button className='search-btn me-2' onClick={()=>handleProductDetails(product._id)}><BsSearch/></button>
                        <button className='cart-btn' onClick={()=>onAdd(product)}><BsCart/></button>
                    </div> 
                </div>

                )    
            }
            </div>

            <div className=" row ">
                <h3 className='text-center mt-5'>Old Products</h3>
            {
               olderProducts.map(product =>
                <div className='product-card col-lg-3 col-md-6 col-sm-12 col-12'>
                    <div className='single-card'>
                        <div className='text-center image'>
                            <img src={product.image} alt="image" className='w-75'/>
                        </div>
                        <div className='text-center pb-2'>
                            <p>
                               <span className='name-text'>{product.productName}</span> <br />
                               <span className='amount-text'>{product.amount} pieces</span> <br />
                               <span className='price-text'>৳ {product.price}</span><br /> 
                               {
                                product.discount>0 &&
                                <span>      
                                <small className='text-muted text-decoration-line-through'>৳ {product.keyPrice}</small>  <small><b>-{product.discount}%</b></small>       
                                </span>
                            }
             
                            </p>
                        </div>
                    </div>
                    <div className='details'>
                        <button className='search-btn me-2' onClick={()=>handleProductDetails(product._id)}><BsSearch/></button>
                        <button className='cart-btn' onClick={()=>onAdd(product)}><BsCart/></button>
                    </div> 
                </div>

                )    
            }
            </div>

          
        </div>
    );
};

export default Products;