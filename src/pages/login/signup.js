import React, { useState, useEffect } from 'react';
import './login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../redux/slices/authSlice';

export default function Signup() {
    const navigate = useNavigate();
    const [pswdType, setPswdType] = useState("password");
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();
    const [checkTerms, setCheckTerms] = useState(false);
    const { SignupUser } = useAuth();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const toggleCheck = (e) => {
        setCheckTerms(e.target.checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === undefined || password === undefined) {
            alert("Please enter email and password.");
        }
        else {
            if (checkTerms) {
                // if (SignupUser(fullName, username, email, password) !== null) {
                //     navigate("/explore");
                // }
                dispatch(signUp({ fullName: fullName, username: username, email: email, password: password }));
            } else {
                alert("Please accept terms and conditions.");
            }
        }
    }
    useEffect(() => {
        console.log("auth - ", auth.uid, auth.username);
    }, [auth]);

    return (
        <div>

            <div className="page-container">

                <div className="container-login">
                    <h2 className="heading">Sign up</h2>
                    {auth.uid}
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