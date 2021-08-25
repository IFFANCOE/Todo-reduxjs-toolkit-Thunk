import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAsync } from '../redux/userSlice';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync())
    
  }, [dispatch])


  const onSubmit = e => {
    e.preventDefault();
    const isLogin = users.find(user => email === user.email);
    console.log(isLogin);
    console.log("submit: : ",users);
    console.log("submit: : ",email);


  }

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6 col-xl-5">
          <p className="text-center h1 fw-bold">Login</p>
          <form className="bg-white  rounded-5 shadow-5-strong p-5"
          onSubmit={onSubmit}
            action="" method="">
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input
                name="user_email"
                type="email" id="_email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <label htmlFor="_email">Email address</label>
            </div>
            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <input name="user_pass"
                type="password" id="_pass"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
              <label htmlFor="_pass" >Password</label>
            </div>
            {/* <!-- Submit button --> */}
            <button type="submit" onSubmit={onSubmit} className="btn btn-primary btn-block">Sign in</button>
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
