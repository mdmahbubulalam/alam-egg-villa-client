import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './ProductDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BsCart , BsSearch} from "react-icons/bs";
import Comments from '../Comments/Comments';
import { BallTriangle } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';


const ProductDetails = (props) => {
    const {onAdd}=props;
    const [product, setProduct] = useState('');
    const [reletedProducts, setReletedProducts] = useState([]);
    
    const {productId} = useParams();
    const url = 'https://boiling-escarpment-47375.herokuapp.com/products/'+productId

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productId])

    const reletedProductsurl = 'https://boiling-escarpment-47375.herokuapp.com/products'

    useEffect(() => {
        fetch(reletedProductsurl)
        .then(res => res.json())
        .then(data =>  setReletedProducts(data))
    },[])

    const history = useHistory();
    const handleProductDetails =(productId)=> {
        history.push(`/details=${productId}`)
      }
    
    return (
        <>   
        <div className='container mt-5'>
            
            {
            product ?
            <div className="row">
                <div className="col-md-5">
              
                <Carousel showThumbs={true} >
                    <div>
                        <img src={product.image} alt="" className="bg-light img-fluid"/>
                    </div>
                    <div>
                        <img src={product.image} className="bg-light img-fluid" alt="" />
                    </div>
                    <div>
                        <img src={product.image} className="bg-light img-fluid" alt="" />
                    </div>
                    <div>
                        <img src={product.image} className="bg-light img-fluid" alt="" />
                    </div>

                </Carousel>
                </div>
                <div className='col-md-1'></div>
                
                <div className="col-md-6">
                    <h3>{product.productName} ({product.amount} Pieces)</h3>
                    <h5 className='price-text'>৳ {product.price}</h5>
                    {
                        product.discount>0 &&
                        <p><small className='text-muted text-decoration-line-through p-0 m-0'>৳ {product.keyPrice}</small>  <small><b>-{product.discount}%</b></small></p>
                    }
                    
                    <p>{product.description}</p>
                    <hr />
                     <button type="button" className="btn btn-success btn-sm text-white" onClick={()=>onAdd(product)}><BsCart/> Add To Cart</button>
                </div>
            </div>
            :
            <div className='d-flex justify-content-center mt-5 mb-5'>
                <BallTriangle
                    height="100"
                    width="100"
                    color='#B4855C'
                    ariaLabel='loading'
                />
            </div>
             }
            <hr />
            
            <h3 className='text-center mt-5'>Related Products</h3>
            {
                reletedProducts.length ?
           
            <div className='row'>
                {
                reletedProducts.map(reletedProduct => 
                    (product.productName === reletedProduct.productName) && (product._id !== reletedProduct._id) &&
                    <div className='product-card col-lg-3 col-md-6 col-sm-12 col-12 '>
                    <div className='single-card'>
                        <div className='text-center image'>
                            <img src={reletedProduct.image} alt="image" className='w-75 img-responsove'/>
                        </div>
                        <div className='text-center pb-2'>
                            <p>
                               <span className='name-text'>{reletedProduct.productName}</span> <br />
                               <span className='amount-text'>{reletedProduct.amount} pieces</span> <br />
                               <span className='price-text'>৳ {reletedProduct.price}</span><br />
                               {
                                reletedProduct.discount>0 &&
                                <span>      
                                <small className='text-muted text-decoration-line-through'>৳ {reletedProduct.keyPrice}</small>  <small><b>-{reletedProduct.discount}%</b></small>       
                                </span>
                            }
      
                            </p>
                           
                            
                        </div>
                    </div>
                    <div className='details'>
                        <button className='search-btn me-2' onClick={()=>handleProductDetails(reletedProduct._id)}><BsSearch/></button>
                        <button className='cart-btn' onClick={()=>onAdd(reletedProduct)}><BsCart/></button>
                    </div> 
                </div>
                )
                }
           

            </div>
            :
            <div className='d-flex justify-content-center mt-5 mb-5'>
                <BallTriangle
                    height="100"
                    width="100"
                    color='#B4855C'
                    ariaLabel='loading'
                />
            </div>
             }
            <hr />
            <div className="row">
                <div className="col-md-12">
                    <Comments productId={productId}/>
                </div>
            </div>
            
        </div>
        </>
    );
};

export default ProductDetails;