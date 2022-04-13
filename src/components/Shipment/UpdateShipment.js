import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const UpdateShipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {shipmentId} = useParams();
    const [shipment, setShipment] = useState({});
    const [address, setAddress] = useState({});
    const [phone, setPhone] = useState({});
    const [userName, setUserName] = useState({});
    const [email, setEmail] = useState({});
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        let info = {
            address,
            phone
        }
 
         const url = 'http://localhost:5000/updateShipment/'+shipmentId
         fetch(url, {
             method:'PATCH',
             headers : {
                 'content-type' : 'application/json'
             },
             body : JSON.stringify(info)
         })
         .then(res => res.json())
         .finally(() => {
             history.push('/orders');
           });
         
     };

    const url = 'http://localhost:5000/shipment?email='+loggedInUser.email
    useEffect(() => {
        fetch(url, {
            method:'GET',
            headers : {
              'content-type' : 'application/json',
              'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
          })
        .then(res => res.json())
        .then(data =>{ 
            setUserName(data.name)
            setEmail(data.email)
            setAddress(data.address)
            setPhone(data.phone)
        })
    },[])

   
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 my-5 py-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <p className='text-start m-0'>Name</p> 
                            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} disabled className="form-control" />
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Email</p> 
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled className="form-control" />
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Address</p> 
                            <textarea type="text" value={address} className="form-control" onChange={e => setAddress(e.target.value)}  name="address" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Phone</p> 
                            <input type="number" value={phone} onChange={e => setPhone(e.target.value)} name="phone" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-color w-100">Update Shipment Info</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
            
        </div>
    );
};

export default UpdateShipment;