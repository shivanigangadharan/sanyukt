import React, { useState, useEffect } from 'react';
import './login.css';
import 'styles.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSignUp } from '../../redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
    const navigate = useNavigate();
    const [pswdType, setPswdType] = useState("password");
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();
    const [checkTerms, setCheckTerms] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const toggleCheck = (e) => {
        setCheckTerms(e.target.checked);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === undefined || fullName === undefined || email === undefined || password === undefined) {
            toast.error("Please enter all details.", { duration: 3000 });
        }
        else {
            if (checkTerms) {
                const res = await dispatch(userSignUp({ fullName: fullName, username: username, email: email, password: password }))

                if (res.payload) {
                    navigate("/explore");
                } else {
                    toast.error(`Sign up failed: ${res.error.message}`, { duration: 3000 });
                }
            } else {
                toast.error('Please accept terms and conditions.', { duration: 3000 });

            }
        }
    }

    return (
        <div>
            <div><Toaster /></div>
            <div className="page-container bg-teal">

                <div className="container-login">
                    <h2 className="heading">Sign up</h2>
                    <form>
                        <div className="input-container">
                            <br />
                            <input required onChange={e => setFullName(e.target.value)} className="text-input" type="text" placeholder="Enter full name" />
                        </div>
                        <div className="input-container">
                            <br />
                            <input required onChange={e => setUsername(e.target.value)} className="text-input" type="text" placeholder="Choose a username" />
                        </div>
                        <div className="input-container">
                            <br />
                            <input required onChange={e => setEmail(e.target.value)} className="text-input" type="email" placeholder="Enter email : adarshbalika@gmail.com" />
                        </div>
                        <div className="input-container">
                            <br />
                            <div>
                                <input required onChange={e => setPassword(e.target.value)} className="text-input" type={pswdType} placeholder="Enter password : ***********" />

                                <div onClick={() => { pswdType === "password" ? setPswdType("text") : setPswdType("password") }} className="show-pswd"> {pswdType === "password" ? "Show password" : "Hide password"} </div>
                            </div>
                        </div>

                        <div className="remember-me">
                            <div>
                                <input type="checkbox" required onClick={e => toggleCheck(e)} /> I accept all terms and conditions
            </div>
                        </div>
                        <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btn login">Create new account</button>
                        <div className="create">
                            <Link to="/login">
                                Already have an account
                <i className="fa-solid fa-chevron-right"></i>
                            </Link>
                        </div>
                    </form>
                </div>

            </div>

        </div >
    )
}