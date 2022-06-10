import React from 'react';
import logo from '../../assets/sanyuktLogo.png';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
    return (
        <div>
            <div className="header-container">
                <Link to="/homepage" className="header-content">
                    <img src={logo} alt="logo" className="brand-logo" />
                    <span className="brand-name"> Sanyukt </span>
                </Link>
            </div>
            <div>
                <iframe />
            </div>
        </div>
    )
}