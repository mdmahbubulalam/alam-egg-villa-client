import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserContext } from '../../../App';

const SignUp = (props) => {
    const {countCartItems} = props;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user,setUser] = useState({
        isSingnedIn : false,
        userName : '',
        email : '',
        password : '',
        errorMessage : '',
        successMessage: '',
        profileImage : '',
      })

    const handleBlur = (e)=> {
        let isFormValid;
        if (e.target.name === 'userName'){
            isFormValid = e.target.value
        }
        if (e.target.name === 'email'){
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            isFormValid = re.test(e.target.value)
        }
        if (e.target.name === 'password'){
            const checkPassLength = e.target.value.length >6 && e.target.value.length <15
            const re = RegExp(/-?\d{1,10}/g);
            const checkPassContainNumber = re.test(e.target.value);
            isFormValid = checkPassLength && checkPassContainNumber;
        }
        if(isFormValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
            setLoggedInUser(newUserInfo)

        }
    }
    
    const handleSubmit = (e) => {
        if(user.userName && user.email && user.password){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const userInfo = userCredential.user;
                const successMessage = 'User created successfully';
                const newUserInfo = {...userInfo}
                newUserInfo.errorMessage = '';
                newUserInfo.successMessage = successMessage;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                updateUserName(user.userName);
            })
            .catch((error) => {
                const errorMessage = 'Email already in use';
                const newUserInfo = {...user}
                newUserInfo.errorMessage = errorMessage;
                newUserInfo.successMessage = '';
                setUser(newUserInfo)
                setLoggedInUser(newUserInfo)

            });
        }
        e.preventDefault()
    }

    const updateUserName = (userName) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: userName
        }).then(() => {
            console.log('User name updated successfully');
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className='col-md-4'></div>
                <div className='col-md-4 '>
            
                <div className='my-5 py-5 border p-4 rounded'>
                    {
                        user.errorMessage ?
                        <p className='text-danger'>{user.errorMessage}</p>
                        :
                        <p className='text-success'>{user.successMessage}</p>
                    }
                
                    <form onSubmit = {handleSubmit}>
                        <div className="mb-3">
                            <p className='text-start m-0'>Name</p> 
                            <input type="text" name='userName' onBlur={handleBlur} className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Email</p> 
                            <input type="email" name='email' onBlur={handleBlur} className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <p className='text-start m-0'>Password</p> 
                            <input type="password" name="password" onBlur={handleBlur} className="form-control" id="exampleInputPassword1" required/>
                        </div>
                        <button type="submit" className="btn btn-color w-100">Sign Up</button>
                        <p className='m-0 text-center'> <small>Already member? Please,<Link to="/login" className='register-text'> login</Link> here.</small></p>
                    </form>
                    
                </div>
                </div>
                <div className='col-md-4'></div>
            </div>

        </div>
        
    );
};

export default SignUp;