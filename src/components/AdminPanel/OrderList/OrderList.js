import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { CgDetailsMore } from "react-icons/cg";
import { useHistory } from 'react-router-dom';
import { AiTwotoneDelete } from "react-icons/ai";

const OrderList = () => {
    const history = useHistory()
   
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [statusSuccessMessage, setStatusSuccessMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

   
    const handleDetail = orderId => {
        history.push(`/orderDetails/${orderId}`)
    };  

    useEffect(() => {
        setTimeout(() => {
          setStatusSuccessMessage('')
        }, 5000)
    })


    
    const url = 'https://boiling-escarpment-47375.herokuapp.com/orders'
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
        })
    },[])

    const handleStatus = (id, status) => {
        let modifiedOrders = [];
        orders.map(order => {
            modifiedOrders.push(order)
        })
        setOrders(modifiedOrders);

        const modifiedStatus = { id, status }
        

        const url = `https://boiling-escarpment-47375.herokuapp.com/updateOrderStatus/` 
        fetch(url, {
            method:'PATCH',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(modifiedStatus)
        })
        .then(res => setStatusSuccessMessage('Order status updated successfully'))
    
    };

    const handleOrderDelete = (id) => {

        const url = `https://boiling-escarpment-47375.herokuapp.com/deleteOrder/${id}`;
        fetch(url,{
            method:'DELETE'
          })  
          .then(res =>  res.json())
          .then(data => {
            setSuccessMessage('Order deleted successfully')
            const ordersAfterDelete = orders.filter(
                (order) => order._id !== id
            );
            setOrders(ordersAfterDelete); 
          })     
    }

    useEffect(() => {
        setTimeout(() => {
            setSuccessMessage('')
        }, 5000)
    })


    return (
        <div className='container '>
            
            <div className='row'>
                <div className="col-lg-2 col-md-3 col-sm-12">
                    <SideBar/>
                </div>
                <div className="col-lg-10 col-md-9 col-sm-12 py-3 mt-3 ">
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/orderList">Order List</Link>  
                        </li>
                    </ul>
                </div>
                <h5 className='text-success text-center'>{statusSuccessMessage}</h5>
                <h5 className='text-success text-center'>{successMessage}</h5>
                {
                    orders.length ?
                
                    <table class="table bg-light table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Order #</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Grand Total</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        {
                            orders?.map(order => 
                        <tbody>
                            <tr>
                                <th>{order.orderId}</th>
                                <td>{order.paymentMethod}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderDate}</td>
                                <td>
                                    <select
                                        className="form-select "
                                        defaultValue={order.status}
                                        onChange={e => handleStatus(order._id, e.target.value)}>
                                        <option className="bg-white text-muted">Pending</option>
                                        <option className="bg-white text-muted">On going</option>
                                        <option className="bg-white text-muted">Done</option>
                                    </select>
                                </td>
                                <td col="2"><h5> <span style={{cursor:"pointer"}} onClick={() => handleOrderDelete(order._id)} ><AiTwotoneDelete/></span></h5></td>
                                <td><h4><CgDetailsMore onClick={()=>handleDetail(order._id)} style={{cursor:'pointer'}}/></h4></td>
                            </tr>
                        </tbody>
                        )
                    }
                    </table>
                    :
                    <h5 className='text-warning text-center'>Order list is empty !!!</h5>
                }
                </div>
            </div>
            
        </div>
    );
};

export default OrderList;