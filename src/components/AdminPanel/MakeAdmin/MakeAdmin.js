import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

const MakeAdmin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [value, setValue] = useState(); 

    const onSubmit = data => {

        const adminUser = {
            adminEmail : data.email,
            date: new Date().toLocaleString()
        }
       
        const url = `https://boiling-escarpment-47375.herokuapp.com/addAdminUser`
        fetch(url, {
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
                body : JSON.stringify(adminUser)
            })
            .then(res => res.json())
            .then(data => {
                setSuccessMessage('Admin user created successfully')
                setValue('')
            })
        };

    useEffect(() => {
        setTimeout(() => {
            setValue()
        }, 1000)
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
                                <Link className="nav-link "  to="/adminUser">Admin User List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/makeAdmin">Make Admin</Link>
                            </li>
                        </ul>
                    </div>  
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                        <div class="row">
                        <h5 className='text-success text-center'>{successMessage}</h5>
                            <span>Email</span> 
                            <div class="col">
                                <input type="email" value={value} className="form-control"  {...register("email", { required: true })} placeholder='admin@eggvilla.com'/>
                                {errors.email && <span className='text-danger'>email is required</span>}
                            </div>
                            <div class="col">
                                <button type="submit" className="btn btn-color">Submit</button>
                            </div>
                        </div>
                    </form>     
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;