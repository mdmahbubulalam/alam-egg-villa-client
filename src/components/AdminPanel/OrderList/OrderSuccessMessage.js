import React from 'react';
import { useHistory } from 'react-router-dom';

const OrderSuccessMessage = () => {
    const history = useHistory()
    const handleClick = ()=> {
        history.push('/shop')
    }
    return (
        <div className='container'>
            <div className="row">
                <div className='col-md-12 text-center mt-5'>
                <h5 className='text-success '>Your order place successfully</h5>
                <button className='btn btn-color w-25' onClick={handleClick}>Go To Shop</button>
                </div>
                
            </div>
        </div>
    );
};

export default OrderSuccessMessage;