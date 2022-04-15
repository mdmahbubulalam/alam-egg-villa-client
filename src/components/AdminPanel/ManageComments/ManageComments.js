import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { AiTwotoneDelete } from "react-icons/ai";

const ManageComments = () => {
    const [allComments, setAllComments] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    let count = 1
    const url = 'https://boiling-escarpment-47375.herokuapp.com/allComments'
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setAllComments(data))
    },[])

    const handleCommentDelete = (id) => {

        const url = `https://boiling-escarpment-47375.herokuapp.com/deleteComment/${id}`;
        fetch(url,{
            method:'DELETE'
          }) 
          .then(res =>  res.json())
          .then(data => {
            setSuccessMessage('Comment deleted successfully')
            const commentsAfterDelete = allComments.filter(
                (allComment) => allComment._id !== id
            );
            setAllComments(commentsAfterDelete); 
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
                        <Link className="nav-link active"  to="/manageComments">Manage Comments</Link>
                    </li>
                </ul>
                </div>
                <h5 className='text-success text-center'>{successMessage}</h5>
                {
                    allComments.length ?
                
                <table className="table bg-light table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        
                            {allComments.map(allComment => 
                            <tbody>
                                <tr>
                                    <th scope="row">{count++}</th>
                                    <td>{allComment.userName}</td>
                                    <td>{allComment.userEmail}</td>
                                    <td>{allComment.rating/20}</td>
                                    <td>{allComment.comment}</td>
                                    <td>{allComment.commentDate}</td>
                                    <td col="2"><h5> <span style={{cursor:"pointer"}} onClick={() => handleCommentDelete(allComment._id)}  ><AiTwotoneDelete/></span></h5></td>
                                </tr>
                            </tbody>
                        )}
                        
                    </table>
                    :
                    <h5 className='text-warning text-center'>No one has commented yet !!!</h5>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageComments;