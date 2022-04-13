import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const {orderId} = useParams();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [status, setStatus] = useState('');

    
    const url = 'http://localhost:5000/orders/'+orderId
    useEffect(() => {
        fetch(url, {
            method:'GET',
            headers : {
              'content-type' : 'application/json',
              'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
          })
        .then(res => res.json())
        .then(data => {
            setOrders(data)
            setStatus(data.status)
        })
    },[])
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-4">
                    <h5 className='text-center'>Shipment and billing info</h5>
                    <div className='border p-3'>
                        <p>
                            <b>Order Id : </b>{orders.orderId}<br/>
                            <b>Customer Name : </b>{orders?.customerInfo?.name}<br/>
                            <b>Customer Email : </b>{orders?.customerInfo?.email}<br/>
                            <b>Shipping Address : </b>{orders?.customerInfo?.address}<br/>
                            <b>Customer's Phone : </b>{orders?.customerInfo?.phone}<br/>
                            <b>Payment Method : </b>{orders.paymentMethod}<br/>
                            <b>Order date : </b>{orders.orderDate}<br/>
                            <b>Status : </b>{orders.status}<br/>
                        </p>
                        
                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>{status}</h1>
                        <input name="status" value={status}  onChange={e => setStatus(e.target.value)}/>
                        <input type="submit" />
                        </form>  */}
                    </div>

                </div>
                <div className="col-md-8">
                    <h5 className='text-center'>Products info</h5>
                    <table class="table bg-light table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{
                                  orders?.orderedProducts?.map(orderedProduct => <span><img src={orderedProduct.image} alt="" height="40" /> <br /></span>   )
                                }</td>
                                <td>
                                {
                                  orders?.orderedProducts?.map(orderedProduct => <p>{orderedProduct.productName} ({orderedProduct.amount})</p>  )
                                }
                                </td>
                                <td>
                                {
                                  orders?.orderedProducts?.map(orderedProduct => <p>{orderedProduct.qty}</p>  )
                                }
                                <hr />
                                <p><b>Total Price</b></p>
                                <p><b>Shipping Cost</b></p>
                                <hr />
                                <p><b>Grand Total</b></p>
                                </td>
                                <td>
                                {
                                  orders?.orderedProducts?.map(orderedProduct => <p>৳ {orderedProduct.price}</p>  )
                                }
                                <hr />
                                <p><b>৳ {orders.productPrice}</b></p>
                                <p><b>৳ {orders.shippingCost}</b></p>
                                <hr />
                                <p><b>৳ {orders.totalPrice}</b></p>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;