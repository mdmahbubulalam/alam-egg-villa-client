import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiTwotoneDelete,AiTwotoneEdit } from "react-icons/ai";
import SideBar from '../../SideBar/SideBar';
import { useHistory } from 'react-router-dom';

const ManageProduct = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [products, setProducts] = useState([]);

    const url = 'https://boiling-escarpment-47375.herokuapp.com/products'
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
            setProducts(data)
        })
    },[])

    let count=1;
    const history = useHistory();
    const loadSingleProduct =(productId)=> {
        history.push(`/updateProduct/${productId}`)
      }

      const handleDelete = (productId)=>{
        const url = 'https://boiling-escarpment-47375.herokuapp.com/delete/'+productId
          fetch(url,{
            method:'DELETE'
          }) 
          .then(res => res.json())
          .then(data => {
            setSuccessMessage('Product deleted successfully')
            const productsAfterDelete = products.filter(
                product => product._id !== productId
            );
            setProducts(productsAfterDelete); 
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
            <div className="col-md-2">
                <SideBar/>
            </div>
            <div className="col-md-10 py-3 mt-3">
                <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link "  to="/addProduct">Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/manageProduct">Manage Product</Link>
                    </li>
                </ul>
                </div>
                <div>
                <h5 className='text-success text-center'>{successMessage}</h5>
                <table className="table bg-light table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Key Price</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                <tr>
                                    <th scope="row">{count++}</th>
                                    <td><img src={product.image} alt="image" srcset="" height='50px'/></td>
                                    <td>{product.productName}</td>
                                    <td><p className='text-break'>{product.description}</p></td>
                                    <td>{product.amount}</td>
                                    <td>{product.keyPrice}</td>
                                    <td>{product.discount}</td>
                                    <td>{product.price}</td>
                                    <td col="2"><h5><span style={{cursor:"pointer"}} onClick={()=>loadSingleProduct(product._id)}><AiTwotoneEdit/></span> <span style={{cursor:"pointer"}}  onClick={() => handleDelete(product._id)}><AiTwotoneDelete/></span></h5></td>
                                </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
    </div>
    );
};

export default ManageProduct;