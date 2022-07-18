import React from 'react';
import logo from 'assets/sanyuktLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { useSelector } from 'react-redux';

export default function Header() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.getItem("user") ? navigate("/homepage") : navigate("/")
    }
    return (
        <div>
            <div className="header-container">
                <span onClick={handleClick} className="header-content">
                    <img src={logo} alt="logo" className="brand-logo" />
                    <span className="brand-name"> Sanyukt </span>
                </span>
            </div>
            <div>
                <iframe />
            </div>
        </div>
    )
}