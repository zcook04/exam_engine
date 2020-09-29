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
                <Link to={ctaLink}><span className="home-card-cta">
                    {cta}
                </span></Link>
            </div>
            <div className="home-card-endcap">
                
            </div>
        </div>
    );
};

export default HomeCard;