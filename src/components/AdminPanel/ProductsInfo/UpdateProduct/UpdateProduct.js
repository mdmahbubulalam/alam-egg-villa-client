
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBar from '../../SideBar/SideBar';

const UpdateProduct = () => {
    const {productId} = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [product, setProduct] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [productName,setProductName] = useState({});
    const [description,setDescription] = useState({});
    const [amount,setAmount] = useState({});
    const [price,setPrice] = useState({});
    const [keyPrice,setKeyPrice] = useState({});
    const [discount,setDiscount] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const history =useHistory();
    const onSubmit = data => {
        
       let item = {
        productName,
        description,
        amount,
        keyPrice,
        discount,
        price : Math.round(keyPrice - (keyPrice*discount/100)),
        image: imgUrl
       }

        const url = 'http://localhost:5000/updateProduct/'+productId
        fetch(url, {
            method:'PATCH',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(item)
        })
        .then(res => res.json())
        .then(data => setSuccessMessage('Product updated successfully'));
        
    };

    useEffect(() => {
        setTimeout(() => {
            setSuccessMessage('')
        }, 5000)
    })
    
    const url = 'http://localhost:5000/products/'+productId

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => 
            {
                setProductName(data.productName)
                setDescription(data.description)
                setAmount(data.amount)
                setKeyPrice(data.keyPrice)
                setDiscount(data.discount)
                setPrice(data.price)
                setImgUrl(data.image)
            }

        )
    },[productId])

    

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
                            <Link className="nav-link active" aria-current="page" to="/addProduct">Update Product</Link>
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
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} name="productName"  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Description</p> 
                        <textarea type="text" value={description} onChange={e => setDescription(e.target.value)} name="description" className="form-control"  rows="3"></textarea>
                        
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Amount</p> 
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} name="amount" className="form-control" /> 
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Key Price</p> 
                        <input type="number" value={keyPrice} onChange={e => setKeyPrice(e.target.value)} name="keyPrice" className="form-control" />        
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Discount</p> 
                        <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} name="discount" className="form-control" />        
                    </div>
                    <div className="mb-3">
                        <p className='text-start m-0'>Price</p> 
                        <input type="number" value={Math.round(keyPrice - (keyPrice*discount/100))} onChange={e => setPrice(e.target.value)} {...register("price")} className="form-control" />        
                    </div>
                    <div className="mb-3">
                        <img src={imgUrl} alt="" style={{height:'100px'}}/><br />
                        <p className='text-start m-0'>Upload an image</p>      
                        <input {...register("image")} type="file" onChange={handleImageUpload}/>
                        
                    </div>
                    
                    <button type="submit"  className="btn btn-color w-100">Submit</button>
                </form>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default UpdateProduct;