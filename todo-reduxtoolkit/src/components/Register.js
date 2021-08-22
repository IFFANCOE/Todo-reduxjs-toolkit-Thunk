import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import './css/style.css'

const Register = () => {
    let history = useHistory();
    const eye = <FontAwesomeIcon icon={faEye} />;

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [c_password, setC_Password] = useState("")
    const [c_passwordError, setC_PasswordError] = useState("")

    const [passwordShown, setPasswordShown] = useState(false);
    const [c_passwordShown, setC_PasswordShown] = useState(false);
    const validateEmail = (e) => {
        //Email
        const inputEmail = e.target.value
        if (validator.isEmail(inputEmail)) {
            setEmailError("Valid Email")
            setEmail(inputEmail)
        } else {
            setEmailError(" for example user@gmail.com")
            setEmail(inputEmail)
        }

    }
    const validatePassword = (e) => {
        const inputPassword = e.target.value
        // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1  }
        if (validator.isStrongPassword(inputPassword)) {
            setPasswordError('Is Strong Password')
            setPassword(inputPassword)
        } else {
            setPasswordError('Is Not Strong Password')
            setPassword(inputPassword)
        }
    }
    const validatePasswordCfPassword = (e, password) => {
        const input_cf_Password = e.target.value
        if (validator.isStrongPassword(input_cf_Password)) {
            setC_Password(input_cf_Password)
            setC_PasswordError('Is Strong Password')
        } else {
            setC_Password(input_cf_Password)
            setC_PasswordError('Is Not Strong Password')
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== c_password) {
            alert("The passwords doesn't match")
            return false
        } else {
            console.log(`Email: ${email}`);
            console.log(`Name: ${name}`);
            console.log(`Password: ${password}`);
            const userObject = {
                name: name,
                email: email,
                password: password
            }
            axios.post('http://localhost:4000/users/create-user', userObject).then(res => {
                console.log(res.data);
            })
            setEmail("")
            setName("")
            setPassword("")
            setC_Password("")
        }

    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }
    const toggleC_PasswordVisiblity = () => {
        setC_PasswordShown(c_passwordShown ? false : true);
    }
    return (
        <section >
            <div className="container  p-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 ">
                        <div className="text-black">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 ">
                                    <p className="text-center h1 fw-bold">Sign up</p>
                                    <form onSubmit={onSubmit}
                                        action="" method="post"
                                        className="bg-white  rounded-5 shadow-5-strong p-5">
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <input type="name" className="form-control"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value) }}
                                                    placeholder="Name" />
                                                <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <input name="user_email"
                                                    type="email" className="form-control"
                                                    value={email}
                                                    placeholder="Email"
                                                    onChange={validateEmail}
                                                    required />
                                                <label className="form-label" htmlFor="_email">Your Email </label>
                                                <span className="text-danger"  >  {emailError}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <input className="form-control"
                                                    value={password}
                                                    name="password"
                                                    onChange={validatePassword}
                                                    type={passwordShown ? "text" : "password"}
                                                    placeholder="Password" />
                                                <i className="eye1" onClick={togglePasswordVisiblity}  >{eye}</i>
                                                <label className="form-label" htmlFor="_pass">Password</label>
                                                <span className="text-danger"  >  {passwordError}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <input className="form-control"
                                                    name="password"
                                                    value={c_password}
                                                    onChange={validatePasswordCfPassword}
                                                    type={c_passwordShown ? "text" : "password"}
                                                    placeholder="Confirm password" />
                                                <i className="eye2" onClick={toggleC_PasswordVisiblity}  >{eye}</i>
                                                <label className="form-label" htmlFor="c_pass">Repeat your password</label>
                                                <span className="text-danger"  >  {c_passwordError}</span>

                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" className="btn btn-primary btn-lg" onClick={onSubmit}>Register</button>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" className="btn btn-primary btn-lg" onClick={() => history.push("/")}>Back</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
