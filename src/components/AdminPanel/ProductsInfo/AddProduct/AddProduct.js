import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';

const AddProduct = () => {
    const history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imgUrl, setImgUrl] = useState('');
    const [keyPrice, setKeyPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [value, setValue] = useState();



    const onSubmit = data => {
        const productData = {
            productName : data.productName,
            description : data.description,
            amount : data.amount,
            keyPrice : data.keyPrice,
            discount : data.discount,
            price : Math.round(keyPrice - (keyPrice*discount/100)),
            image : imgUrl
        }

        const url = `https://boiling-escarpment-47375.herokuapp.com/addProduct`
        fetch(url, {
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(productData)
        })
        .then(res => res.json())
        .then(data => {
            setSuccessMessage('Product added successfully')
            setValue('')
            setPrice('')
            
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setValue()
        }, 5000)
    })

    useEffect(() => {
        setTimeout(() => {
            setValue()
        }, 1000)
    })

    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set('key', '606693f2875564d94b8395fd730fb31f');
        imageData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImgUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    

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
                            <Link className="nav-link active" aria-current="page" to="/addProduct">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/manageProduct">Manage Product</Link>
                        </li>
                    </ul>
                    </div>
                    <div className='bg-light '>
                    <h5 className='text-success text-center pt-2'>{successMessage}</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                   
                    <div className="mb-3 ">
                        <p className='text-start m-0'>Product Name</p> 
                        <input type="text" value={value} {...register("productName", { required: true })} className="form-control" />
                        {errors.productName && <span className='text-danger'>Product Name is required</span>}
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Description</p> 
                        <textarea type="text" value={value} className="form-control" {...register("description", { required: true })} rows="3"></textarea>
                        {errors.description && <span className='text-danger'>Description is required</span>}
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Amount</p> 
                        <input type="number" value={value} {...register("amount", { required: true })} className="form-control" />
                        {errors.amount && <span className='text-danger'>Amount is required</span>}
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Key Price</p> 
                        <input type="number" value={value} {...register("keyPrice", { required: true })} onChange={e=> setKeyPrice(e.target.value)} className="form-control" />
                        {errors.keyPrice && <span className='text-danger'>Key Price is required</span>}
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Discount</p> 
                        <input type="number" value={value} {...register("discount", { required: true })} placeholder="%" onChange={e=> setDiscount(e.target.value)} className="form-control" />
                        {errors.discount && <span className='text-danger'>Price is required</span>}
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Price</p> 
                        <input type="number" {...register("price")} value={price} onClick={e=> setPrice(Math.round(keyPrice - (keyPrice*discount/100)))}  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Upload an image</p> 
                        <input {...register("image")} value={value} type="file" onChange={handleImageUpload}/>
                        {errors.image && <span className='text-danger'> Image upload is required</span>}
                    </div>
                    
                    <button type="submit" className="btn btn-color w-100">Submit</button>
                </form>
                    </div>
                </div>
               
            </div>
        </div>
        
    );
};

export default AddProduct;