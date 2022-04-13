import React, { useContext, useState } from 'react';
import { CartContext } from '../../App';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import Products from '../Products/Products';


const Home = (props) => {
    const {products, discountPrice, oldProducts, onAdd, handleProductDetails} = props
    const [cart,setCart] = useState([]);
    const handleCartClick =(product)=>{
        setCart([...cart,product]);     
    }
    return (
        <div>
            <Banner/>
            <Products products={products} discountPrice={discountPrice} oldProducts={oldProducts} onAdd={onAdd} handleProductDetails={handleProductDetails}/>
        </div>
    );
};

export default Home;