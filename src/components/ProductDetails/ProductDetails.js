import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './ProductDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BsCart } from "react-icons/bs";
import Comments from '../Comments/Comments';

const ProductDetails = (props) => {
    const {onAdd}=props;
    const [product, setProduct] = useState('');
    
    const {productId} = useParams();
    const url = 'http://localhost:5000/products/'+productId

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productId])
    //const product = products.find(item => item._id === productId);
    
    return (
        <>   
        <div className='container mt-5'>
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