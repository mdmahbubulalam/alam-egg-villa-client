import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Header/Header';
import './Login.css';
import { BsGoogle } from "react-icons/bs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from '../firebase-config';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = (props) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  

    const {adminUsers} = props;

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }

    

  
    const [user,setUser] = useState({
      isSingnedIn : false,
      userName : '',
      email : '',
      password: '' ,
      profileImage : '', 
    })

  

    const handleGoogleSignIn =() => {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const {displayName, email, photoURL} = user;
        const signedInUser = {
          isSingnedIn : true,
          userName : displayName,
          email : email,
          profileImage : photoURL ,
          
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        storeAuthToken()
        history.replace(from);
       
       
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    }

    const handleBlur = (e) => {
      let isFormValid;
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
      e.preventDefault()
      const auth = getAuth();
      if (user.email && user.password) {

   
      signInWithEmailAndPassword(auth,  user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const {displayName, email, password} = user;
          const signedInUser = {
            isSingnedIn : true,
            email : email,
            password : password,
            userName : displayName,  
          }
          setUser(signedInUser)
          setLoggedInUser(signedInUser);
          storeAuthToken()
          history.replace(from);
         
        })
        .catch((error) => {
          const errorMessage = 'Wrong email or password';
          const newUserInfo = {...user}
          newUserInfo.errorMessage = errorMessage;
          newUserInfo.successMessage = '';
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
        });
      }

    }

    const storeAuthToken = () => {
      const auth = getAuth();
      auth.currentUser.getIdToken(true).then((idToken) => {
        sessionStorage.setItem('token', idToken)
      }).catch(function(error) {
        console.log(error);
      });

    }
    
  
    return (
        <>
        <div className='container mt-5'>
          <div className="row">
            <div className='col-md-4'></div>
            <div className='col-md-4'>

            
            {
              loggedInUser.isSingnedIn
              ?
              <p>
                Wellcome, <strong>{loggedInUser.userName}</strong>
              </p>
              :
              <div className='text-center my-5 py-5 border p-4 rounded'>
                {
                     user.errorMessage &&
                     <p className='text-danger'>{user.errorMessage}</p>
                  }
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <p className='text-start m-0'>Email</p> 
                    <input type="email" name='email' onBlur={handleBlur} required className="form-control" />
                  </div>
                  <div className="mb-2">
                    <p className='text-start m-0'>Password</p> 
                    <input type="password" name='password' onBlur={handleBlur} required className="form-control" id="exampleInputPassword1" />
                  </div>
                  <button type="submit" className="btn btn-color w-100">Sign In</button> <br />
                  <p className='m-0'> <small>New member?<Link to="/signup" className='register-text'> Register</Link> here.</small></p>
                </form>
                <p><small>Or, sign in with</small></p>
                <span onClick={handleGoogleSignIn} className='google-icon'><BsGoogle/> Google</span>  
              </div>
            }
            
            </div>
            <div className='col-md-4'></div>

          </div>
            
        </div>
        </>
    );
};

export default Login;