import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([])
    const productName = orders?.orderedProducts?.map(orderedProduct => orderedProduct.productName)
    const productImage = orders?.orderedProducts?.map(orderedProduct => orderedProduct.image)


    const url = 'https://boiling-escarpment-47375.herokuapp.com/ordersByUser?email='+loggedInUser.email

  
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
        data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
        setOrders(data)
      })
    },[])

    return (
        <div className='container' style={{ minHeight:'30vh'}}>
            <div className="row">
                {
                     orders.length && loggedInUser.email ?
                  
                  <div className="col-md-12 mt-5">
                  <p className='text-center'>
                    Congratulations , <strong style={{color:'#1F8B76'}}>{loggedInUser.userName}</strong> !!! <br />
                    You have ordered some products.
                  </p> 
                  <table class="table bg-light table-responsive border">
                        <thead>
                            <tr>
                                <th scope="col" className='fw-bolder fs-5'>Order #</th>
                                <th scope="col" className='fw-bolder fs-5'>Image</th>
                                <th scope="col" className='fw-bolder fs-5'>Name</th>
                                <th scope="col" className='fw-bolder fs-5'>Quantity</th>
                                <th scope="col" className='fw-bolder fs-5'>Price</th>
                                <th scope="col" className='fw-bolder fs-5'>Order Date</th>
                                <th scope="col" className='fw-bolder fs-5'>Status</th>
                            </tr>
                        </thead>

                        {

                        orders?.map(orders =>
                         
                        
                        <tbody>
                            <tr>
                                <th>{orders.orderId}</th>
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
                                
                                <td>{orders.orderDate}</td>
                                <td>{orders.status}</td>
                            </tr>
                        </tbody>
                           )}
                        
                    </table>
                </div>
                :
                <p className='text-center mt-5'>
                    Wellcome, <strong style={{color:'#1F8B76'}}>{loggedInUser.userName}</strong><br />
                    You haven't ordered any product yet.
                  </p> 
                }
            </div>
           
        </div>
    );
};

export default Profile;