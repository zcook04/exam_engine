import React from 'react';
import {Link} from 'react-router-dom'

import './HomeCard.css'

const HomeCard = (props) => {
    const { title, description, cta, ctaLink } = props

    return (
        <div className="home-card">
            <div className="home-card-title">
                {title}
            </div>
            <div className="home-card-description">
                {description}
                <span className="home-card-cta">
                    <Link to={ctaLink}>{cta}</Link>
                </span>
            </div>
            <div className="home-card-endcap">
                
            </div>
        </div>
    );
};

export default HomeCard;