import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Shipment = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shipment, setShipment] = useState({});
    const history = useHistory();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleGoToOrderPage = ()=> {
        history.push('/orders')
    }
    const onSubmit = data => {
        const url = `https://boiling-escarpment-47375.herokuapp.com/addShipment`
        fetch(url, {
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .finally(() => {
            history.push('/orders');
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


  const handleUpdateShipmentInfo = (shipmentId) => {
    history.push(`/updateShipment/${shipmentId}`)
  }
  
    return (
        <>
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className="col-md-4"></div>
          
                <div className='my-5 py-5 col-md-4'>
                    {
                        shipment.address && shipment.phone ?
                        <div>
                            <h5 className='text-center'>Shipment Info</h5>
                           
                            <div className='border p-3'>
                                <p><b>Your Name : </b> {shipment.name}</p>
                                <p><b>Your Email : </b> {shipment.email}</p>
                                <p><b>Shipping Address : </b> {shipment.address}</p>
                                <p><b>Your Phone No. : </b> {shipment.phone}</p>
                            </div>
                            <div className='text-center m-2'>
                            <button className='btn btn-color me-2' onClick={()=>handleUpdateShipmentInfo(shipment._id)}>Update Shipment Info</button>
                            <button className='btn btn-color' onClick={()=>handleGoToOrderPage()}>Go to order page</button>
                            </div>
                            
                            
                          


                        </div>
                        
                        :

             
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <p className='text-start m-0'>Name</p> 
                            <input type="text" value={loggedInUser.userName}  {...register("name", { required: true })} className="form-control" />
                            {errors.name && <span>Name is required</span>}
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Email</p> 
                            <input type="email" value={loggedInUser.email}  {...register("email", { required: true })} className="form-control" />
                            {errors.email && <span>email is required</span>}
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Address</p> 
                            <textarea type="text" className="form-control" {...register("address", { required: true })} rows="3"></textarea>
                            {errors.address && <span>address is required</span>}
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Phone</p> 
                            <input type="number" {...register("phone", { required: true })} className="form-control" />
                            {errors.phone && <span>Phone number is required</span>}
                        </div>
                        <button type="submit" className="btn btn-color w-100">Submit Shipment Info</button>
                    </form>
                           }
                    
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
        </>
    );
};

export default Shipment;