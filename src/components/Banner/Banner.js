import Carousel from 'nuka-carousel';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

const Banner = () => {
    const [autoplay, setAutoplay] = useState(true);
    const [wrapAround, setWrapAround] = useState(false);

    const state = {
        slideIndex: 0
      };

    return (
        <div>
            <Carousel
            autoplay={true}
            autoplayReverse={true}
            wrapAround={true}
            >
                <div className='banner-image-one'>
                    <div className='text'>
                    <h4>No. 1 POULTRY PROVIDER</h4>
                    <h1>TOP QUALITY</h1>
                    <p>We are certified and recognized provider of the best poultry products in the state.</p>
                    <Link to='/shop'><button type="button" className="btn btn-success font-weight-bold btn-lg text-white btn-responsive">Shop Now</button></Link>
                    </div>
                    
                </div>
                <div className='banner-image-two'>
                    <div className='text'>
                    <h4>PREMIUM QUALITY PRODUCTS</h4>
                    <h1>BEST EGGS</h1>
                    <p>Our poultry farm provides the best fresh eggs for local residents, markets, and stores in our state.</p>
                    <Link to='/shop'><button type="button" className="btn btn-success font-weight-bold btn-lg text-white btn-responsive">Shop Now</button></Link>
                    </div>
                   
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;