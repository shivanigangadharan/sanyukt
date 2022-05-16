import React from 'react';
import '../../styles.css';
import './homepage.css';
import Sidebar from '../../components/sidebar/sidebar';

export default function Homepage() {
    return (
        <div className="homepage-container">
            <Sidebar />
        </div>
    )
}