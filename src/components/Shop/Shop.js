import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsCart, BsSearch } from "react-icons/bs";
import ShopBanner from '../Banner/ShopBanner';
import ReactPaginate from 'react-paginate';

const Shop = (props) => {
    const {onAdd } = props;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sort, setSort] = useState("Newest");

    const [pageNumber, setPageNumber] = useState('');

    const limit = 16;
    const pagesVisited = pageNumber * limit;

    const history = useHistory();
    const handleProductDetails =(productId)=> {
        history.push(`/details=${productId}`) 
    }

    const pageCount = Math.ceil(filteredProducts.length / limit);

    const products = filteredProducts?.slice(pagesVisited, pagesVisited + limit)

  const handleChangePage = ({selected}) => {
    setPageNumber(selected);
  };

    const handleSort = (e) => {
        setSort(e.target.value);
    }

    const url = `http://localhost:5000/productsPaginate`

    useEffect(() =>
        fetch(url)
        .then(res=>res.json())
        .then(data => {
            
                if (sort === "Newest") {
                    data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
                    setFilteredProducts(data)
              } else if (sort === "Price High To Low") {
                setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
              );
              } else if(sort === "Price Low To High"){
                setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
              );
              } else if (sort === "Discount High To Low") {
                setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.discount - a.discount)
              );
              } else if(sort === "Discount Low To High"){
                setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.discount - b.discount)
              );
                }
                
              
        })
    , [sort]);


    return (
        <>
        <ShopBanner/>
        <div className='container'>
            <div className="row">
            
                <div className='d-flex justify-content-between' style={{padding:'40px 35px 0px 35px'}}>
                    <p><small>Showing 1 to {products.length} product </small></p>
                    <div>
                        <select class="form-select form-select-sm text-muted " onChange={handleSort}>
                            <option value="Newest" selected>Newest</option>
                            <option value="Price High To Low">Price (Highest to  Lowest)</option>
                            <option value="Price Low To High">Price (Lowest to Highest)</option>
                            <option value='Discount High To Low'>Discount (Highest to  Lowest)</option>
                            <option value='Discount Low To High'>Discount (Lowest to Highest)</option>
                        </select>
                    </div>
                </div>
                <hr />
           
                {  
                products.map(product => 
                    <div className='product-card col-lg-3  col-md-6 col-sm-12 col-12 '>
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
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    onPageChange={handleChangePage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
        </>
    );
};

export default Shop;