import React from 'react'

import './Hamburger.css'

const Hamburger = (props) => {
    const { navOpen, setNavOpen } = props
    
    const openClass = navOpen ? "menu-btn open" : "menu-btn"

    const hamboHandler = () => {
        navOpen ? setNavOpen(false) : setNavOpen(true)
    }

    return (
        <React.Fragment>
            <div className={'menu-btn ' + openClass} onClick={hamboHandler}><div className="menu-btn__burger"></div></div>
        </React.Fragment>
    )
}

export default Hamburger
