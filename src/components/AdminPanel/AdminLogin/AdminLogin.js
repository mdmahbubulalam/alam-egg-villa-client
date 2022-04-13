import React from 'react';

const AdminLogin = () => {

    const handleBlur = e => {

    }

    const handleSubmit = e => {

    }
    return (
        <>
        <div className='container mt-5'>
          <div className="row">
            <div className='col-md-4'></div>
            <div className='col-md-4'>

            
            
              <div className='text-center my-5 py-5 border p-4 rounded'>
                <h5>Admin Login</h5>
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
                </form>
               
            </div>
            </div>
            <div className='col-md-4'></div>

          </div>
            
        </div>
        </>
    );
};

export default AdminLogin;