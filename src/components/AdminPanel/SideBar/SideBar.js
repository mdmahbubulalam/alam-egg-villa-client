import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'


const SideBar = () => {
    return (
        <div className="sidebar d-flex flex-column" style={{paddingTop:'70px'}}>
            <ul className="list-unstyled">
                <li className='mb-3'>
                <Link className='text-decoration-none d-grid' to='/admin'><button className='btn btn-sm btn-color d-grid'>Dashboard</button></Link>
                </li>
                <li className='mb-3'>
                <Link className='text-decoration-none d-grid' to='/orderList'><button className='btn btn-sm btn-color'>Order List</button></Link>
                </li>
                <li className='mb-3'>
                <Link className='text-decoration-none d-grid' to='/productsInfo'><button className='btn btn-sm btn-color'>Products</button></Link>
                </li>
                <li className='mb-3'>
                <Link className='text-decoration-none d-grid' to='/adminUser'><button className='btn btn-sm btn-color '>Admin User</button></Link>
                </li>
                <li>
                <Link className='text-decoration-none d-grid' to='/manageComments'><button className='btn btn-sm btn-color'>Comments</button></Link>
                </li>   
            </ul>
            <hr className='hr'/>
        </div>
    );
};

export default SideBar;