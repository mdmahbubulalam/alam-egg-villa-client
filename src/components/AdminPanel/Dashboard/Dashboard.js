import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsersCog, FaRunning } from "react-icons/fa";
import { MdShoppingCart, MdPending, MdDoneAll } from "react-icons/md";
import SideBar from '../SideBar/SideBar';



const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [shipment, setShipment] = useState([]);
    const statusPending = [];
    const statusOnGoing = [];
    const statusDone = [];
    const totalPrice = orders.map(order =>order.status === "Done" && order.totalPrice  )
    const popular = orders.map(order => order.orderedProducts )
    const popular1 = popular.map(order => order )

    const pending = orders.map(order => order.status === "Pending" && statusPending.push([order.status]))
    const onGoing = orders.map(order => order.status === "On going" && statusOnGoing.push([order.status]))
    const done = orders.map(order => order.status === "Done" && statusDone.push([order.status]))
    const totalSum = totalPrice.reduce((partialSum, a) => partialSum + a, 0);
    

    const ordersUrl = 'http://localhost:5000/orders'
    useEffect(() => {
        fetch(ordersUrl)
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    },[])

    const shipmentUrl = 'http://localhost:5000/allShipment'

    useEffect(() => {
    //fetch(shipmentUrl)
    fetch(shipmentUrl, {
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
        <div className='container '>
            <div className='row'>
                <div className="col-md-2">
                    <SideBar/>
                </div>
                <div className="col-md-10 py-3 mt-3">
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admin">Dashboard</Link>  
                            </li>
                        </ul>
                    </div>
            

                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 mt-1 g-4">
                        <div class="col">
                            <div class="card shadow bg-danger text-light" style={{height:"150px", paddingTop:"15px"}}>
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <h5 class="card-title">Total Users</h5>
                                    <h3 class="card-title"><FaUsersCog/></h3>
                                    </div>
                                    <div className='pt-3'>
                                        <h2>{shipment.length}</h2>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow bg-primary text-light" style={{height:"150px", paddingTop:"15px"}}>
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <h5 class="card-title">Total Orders</h5>
                                    <h3 class="card-title"><MdShoppingCart/></h3>
                                    </div>
                                    <div className='pt-3'>
                                        <h2>{orders.length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow bg-success text-light" style={{height:"150px", paddingTop:"15px"}}>
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <h5 class="card-title">Total Sales</h5>
                                    <h3 class="card-title">৳</h3>
                                    </div>
                                    <div className='pt-3'>
                                        <h2>৳ {totalSum}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow bg-info text-light" style={{height:"150px", paddingTop:"15px"}}>
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <h5 class="card-title">Pending</h5>
                                    <h3 class="card-title"><MdPending/></h3>
                                    </div>
                                    <div className='pt-3'>
                                        <h2>{statusPending.length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow bg-dark text-light" style={{height:"150px", paddingTop:"15px"}}>
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <h5 class="card-title">On going</h5>
                                    <h3 class="card-title"><FaRunning/></h3>
                                    </div>
                                    
                                    <div className='pt-3'>
                                        <h2>{statusOnGoing.length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow bg-warning text-light" style={{height:"150px", paddingTop:"15px"}}>
                                <div class="card-body">
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <h5 class="card-title">Done</h5>
                                    <h3 class="card-title"><MdDoneAll/></h3>
                                    </div>
                                    
                                    <div className='pt-3'>
                                        <h2>{statusDone.length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;