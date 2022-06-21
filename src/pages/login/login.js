import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { userLogin } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === undefined || password === undefined) {
            alert("Please enter email and password.");
        }
        else {

            const res = await dispatch(userLogin({ email: email, password: password }))
            if (res.payload.uid) {
                navigate("/explore");
            } else {
                alert(res.payload);
            }
        }
    }
    return (
        <div>
            <div className="page-container">

                <div className="container-login">
                    <h2 className="heading">Login</h2>
                    <form>
                        <center>
                            <div>
                                <br />
                                <input onChange={e => setEmail(e.target.value)} className="text-input" type="email" placeholder="Enter email : adarshbalika@gmail.com" />
                            </div>
                            <div>
                                <br />
                                <input onChange={e => setPassword(e.target.value)} className="text-input" type="password" placeholder="Enter password : ***********" />
                            </div>
                        </center>
                        <div className="remember-me">
                            <div>
                                <input type="checkbox" /> Remember me
            </div>
                            <a href="#">Forgot your password?</a>
                        </div>
                        <button onClick={e => handleSubmit(e)} className="btn login">Login</button>
                        <div className="create">
                            <Link to="/signup">
                                Create new account
                <i className="fa-solid fa-chevron-right" />
                            </Link>
                        </div>
                    </form>
                </div>

            </div>


        </div>
    )
}