import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { UserContext } from '../../App';


const Comments = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [rating, setRating] = useState(0);
    const [value, setValue] = useState();
    const [allComments, setAllComments] = useState([])
    const [newComment, setNewComment] = useState([])
    const history = useHistory()
    const handleRating = (rate) => {
        setRating(rate); 
      }

    const commentsLength = allComments.length;
    const ratingArray = allComments.map(allComment => allComment.rating)
    const sum = ratingArray.reduce((partialSum, a) => partialSum + a, 0);
    const total =sum/commentsLength; 
    const totalRating = Math.floor(total).toFixed(0);

    const id = props.productId;
    const productId = allComments.productId;
      
    const onSubmit = data => {
        
        const commentReview = {
            productId: id,
            userName: loggedInUser.userName,
            userEmail: loggedInUser.email,
            rating : rating,
            comment : data.comment,
            commentDate:new Date().toLocaleString()
        }

        //const review = commentReview.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
        const url = `http://localhost:5000/addComments`
        fetch(url, {
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(commentReview)
        })
        .then(res => {
            setAllComments([commentReview,...allComments])
            setValue('')
            setRating(0)
            
        })
    };

   

    const url = 'http://localhost:5000/allComments/'+id

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data =>{data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
            setAllComments(data)} )
    },[id])
    

    return (
        <div>
            <h4>Total Rating</h4>
           
            <Rating size={30}  ratingValue={totalRating} tooltipDefaultText="No Rating" readonly={true} allowHalfIcon showTooltip fillColor='#B4855C'/> 

        
            <p><small>{commentsLength} reviews</small></p>
            <hr />
            {
            loggedInUser.isSingnedIn ?
            
                <div>
                    <Rating onClick={handleRating} size={25} ratingValue={rating} showTooltip tooltipDefaultText="No Rating" allowHalfIcon fillColor='#B4855C'/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <p className='text-start m-0'>Write a review</p> 
                            <textarea type="text" className="form-control" value={value} {...register("comment", { required: true })}  rows="3"></textarea>
                            {errors.comment && <span>Review required</span>}
                        </div>
                        <button type="submit" className="btn btn-color">Submit</button>
                    </form>
                </div>
                :
            
                <p className='fs-5 fw-bolder'>For write a review, please <Link to="/login" className='text-decoration-none register-text '>login</Link> first</p>
            
}


         
            
            { 
            
            
            allComments?.map(allComment =>
            <div>
                <hr />
                <div className='d-flex justify-content-between'>
                    <p className='fs-6 m-0 p-0 fw-bolder text-uppercase'>{allComment.userName}</p>
                    <p className='fs-6'>{allComment.commentDate}</p>
                </div>
                {allComment.rating &&
                <Rating size={20} readonly={true}  ratingValue={allComment.rating} showTooltip allowHalfIcon tooltipDefaultText="No Rating"  fillColor='#B4855C'/>
            }
                <p>{allComment.comment}</p>
            </div>
            
            )}


        </div>
    );
};

export default Comments;