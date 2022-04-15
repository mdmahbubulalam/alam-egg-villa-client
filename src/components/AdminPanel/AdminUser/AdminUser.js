import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';

const AdminUser = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    let count = 1
    const url = 'https://boiling-escarpment-47375.herokuapp.com/adminUsers'
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setAdminUsers(data))
    },[])

    const handleAdminUserDelete = (id) => {
        const url = `https://boiling-escarpment-47375.herokuapp.com/deleteAdminUser/${id}`;
        fetch(url,{
            method:'DELETE'
          }) 
        .then(res => res.json())    
        .then(data =>
            {
                const adminUsersAfterDelete = adminUsers.filter(
                    (adminUser) => adminUser._id !== id
                );
                setAdminUsers(adminUsersAfterDelete);      
            }
             )
    }

    useEffect(() => {
        setTimeout(() => {
            setSuccessMessage('')
        }, 5000)
    })

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
                        <Link className="nav-link active"  to="/adminUser">Admin User List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/makeAdmin">Make Admin</Link>
                    </li>
                </ul>
                </div>
                <h5 className='text-success text-center'>{successMessage}</h5>
                <table className="table bg-light table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {
                            adminUsers.map(adminUser => 
                            <tbody>
                                <tr>
                                    <th scope="row">{count++}</th>
                                    <td>{adminUser.adminEmail}</td>
                                    <td>{adminUser.date}</td>
                                    <td col="2"><h5> <span style={{cursor:"pointer"}} onClick={() => handleAdminUserDelete(adminUser._id)} ><AiTwotoneDelete/></span></h5></td>
                                </tr>
                            </tbody>
                        )
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUser;