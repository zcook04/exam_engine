import React from 'react';

import './HomeCard.css'

const HomeCard = (props) => {
    const { title, description, cta } = props

    return (
        <div className="home-card">
            <div className="home-card-title">
                {title}
            </div>
            <div className="home-card-description">
                {description}
                <span className="home-card-cta">
                    {cta}
                </span>
            </div>
            <div className="home-card-endcap">
                
            </div>
        </div>
    );
};

export default HomeCard;