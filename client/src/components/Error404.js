import React from 'react';
import './Loader.css';
import {Link} from 'react-router-dom';

export default function Error404() {
    return (
        <div className="background">
            <p>404! Page Not Found!</p>
            <p className="error">(Invalid URL or Context Link)</p>
            <Link to="/"><button className="error-btn">Home</button></Link>
        </div>
    )
}
