import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Orders = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shipment, setShipment] = useState({});
    const [status, setStatus] = useState('');
    const {cart, clearCart} = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const productPrice = cart.reduce((a,c)=> a+ c.price * c.qty, 0);
    const shippingCost = productPrice> 2000 ? 30 : 50;
    const totalPrice =  productPrice + shippingCost;
    const orderId =  Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    let count = []

    const history = useHistory();

    const onSubmit = data => {
        let ordersData = {
            email: loggedInUser.email,
            orderId:orderId,
            productPrice:productPrice,
            shippingCost:shippingCost,
            totalPrice:totalPrice,
            status:'Pending',
            customerInfo : {...shipment},
            orderedProducts: [...cart],
            paymentMethod: data.payment,
            orderDate:new Date().toLocaleString()
        }

        const url = `https://boiling-escarpment-47375.herokuapp.com/addOrders`
        fetch(url, {
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(ordersData)
        })
        .then(res => res.json())
        .then((data) => {
            history.push('/orderSuccessMessage');
            clearCart()
          });     
     };

    const url = 'https://boiling-escarpment-47375.herokuapp.com/shipment?email='+loggedInUser.email

    useEffect(() => {
        fetch(url, {
            method:'GET',
            headers : {
              'content-type' : 'application/json',
              'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
          })
      .then(res => res.json())
      .then(data => setShipment(data))
    },[])

    

    return (
        <div className='container'>
            <div className="row">
                <h5 className='text-center mt-3'>Order Details</h5>
                <div className="col-md-8">
                <table class="table bg-light">
                        <thead>
                            <tr>
                                <th scope="col">Product Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        {
                            cart.map(cartItem =>          
                                <tbody>
                                    <tr>
                                        <th><img src={cartItem.image} height="50" alt="" srcset="" /></th>
                                        <td>{cartItem.productName} ({cartItem.amount})</td>
                                        <td>৳ {cartItem.price}</td>
                                        <td>{cartItem.qty}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                <div className="col-md-4">
                    <div className='border p-3'>
                        <p><b>Your Name : </b> {shipment.name}</p>
                        <p><b>Your Email : </b> {shipment.email}</p>
                        <p><b>Shipping Address : </b> {shipment.address}</p>
                        <p><b>Your Phone No. : </b> {shipment.phone}</p>
                        <hr />
                        <p><b>Total Price. : </b>৳ {productPrice}</p>
                        <p><b>Shipping Cost : </b>৳ {shippingCost}</p>
                        <hr />
                        <p><b>Grand Total  : </b>৳ {totalPrice}</p>
                        <hr />
                        <p><b>Payment Method : </b></p>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div class="form-check">
                                <input {...register("payment", { required: true })} type="radio" value="Cash" className='me-1'/> 
                                <label class="form-check-label" for="Cash">
                                    Cash on delivery
                                </label>
                            </div>
                            {/* <div class="form-check mb-3">
                                <input {...register("payment", { required: true })} type="radio" value="Stripe" className='me-1' /> 
                                <label class="form-check-label" for="Stripe">
                                    Stripe
                                </label>
                                
                            </div> */}
                            <button type="submit" className="btn btn-color w-100">Place order</button>
                        </form>
                    </div>          
                </div>
            </div>
        </div>
    );
};

export default Orders;