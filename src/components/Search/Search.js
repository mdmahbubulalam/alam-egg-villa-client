import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsCart, BsSearch } from "react-icons/bs";
import SearchBanner from '../Banner/SearchBanner';
import { useParams } from 'react-router-dom';

const Search = (props) => {
    const {onAdd } = props;
    const [searchResults, setSearchResults] = useState([]);
    const {search} = useParams();

    const history = useHistory();
    const handleProductDetails =(productId)=> {
        history.push(`/details/${productId}`) 
    }


    const url = `http://localhost:5000/searchProducts?search=${search}`

    useEffect(() =>
        fetch(url)
        .then(res=>res.json())
        .then(data => setSearchResults(data))
    , [search]);

    


    return (
        <>
        <SearchBanner/>
        <div className='container'>
            <div className="row">
            
                <div className='text-center' style={{padding:'40px 35px 0px 35px'}}>
                    <p><small>{searchResults.length} items found for "{search}" </small></p>
                </div>
                <hr />
           
                {  
                searchResults?.map(product => 
                    <div className='product-card col-lg-3  col-md-6 col-sm-12 col-12 '>
                        <div className='single-card'>
                            <div className='text-center image'>
                                <img src={product.image} alt="image" className='w-75'/>
                            </div>
                            <div className='text-center pb-2'>
                                <p>
                                <span className='name-text'>{(product.productName)}</span> <br />
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
        </>
    );
};

export default Search;