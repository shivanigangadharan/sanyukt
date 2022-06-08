import React from 'react';
import socialNetworking from '../../assets/socialNetworking.svg';
import './landingpage.css';
import { Link } from 'react-router-dom';
import '../../styles.css';

export default function Landingpage() {
    return (
        <div className="landingpage-container">
            <div className="content">
                <div> <span className="app-title primary"> Sanyukt </span><span className="app-title"> - connected</span>
                </div>
                <div className="tag-lines">
                    <span className="highlighted"> FOLLOW </span> PEOPLE AROUND THE GLOBE <br />
                    <span className="highlighted"> CONNECT </span> WITH YOUR FRIENDS <br />
                    <span className="highlighted"> SHARE </span> WHAT YOU'RE THINKING <br />
                </div>
                <div className="text-center">
                    <Link to="/signup">
                        <button className="btn join-now"> SIGN UP </button><br />
                    </Link>
                    <Link to="/login" className="small-sub-text">
                        <span> Already have an account? </span>
                    </Link>
                </div>
            </div>
            <div>
                <img className="socialNetworking-img" src={socialNetworking} alt="socialNetworking-img" />
            </div>

        </div>
    )
}