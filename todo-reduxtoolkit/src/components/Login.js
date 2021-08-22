// import React, { useState } from 'react'
// import axios from 'axios'
// import {} from ''
import {  Link } from "react-router-dom";
const Login = () => {
  
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6 col-xl-5">
          <p className="text-center h1 fw-bold">Login</p>
          <form  className="bg-white  rounded-5 shadow-5-strong p-5"
            action="" method="post">
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input
                name="user_email"
                type="email" id="_email"
                className="form-control"
                placeholder="Email"
                value=""
                onChange=""
                required />
              <label for="_email">Email address</label>
            </div>
            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <input name="user_pass"
                type="password" id="_pass"
                className="form-control"
                value=""
                onChange=""
                placeholder="Password" />
              <label for="_pass" >Password</label>
            </div>
            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
              <Link to="/register" className="link-danger"> Sign up</Link>
            </p>
          </form>
        </div>
      </div>



    </div>
  )
}

export default Login
