import React from 'react'

import './Hamburger.css'

const Hamburger = (props) => {
    const { hamburgerHandler, burgerMenuBtnClasses } = props

    

    return (
        <React.Fragment>
            <div className={burgerMenuBtnClasses} onClick={hamburgerHandler}><div className="menu-btn__burger"></div></div>
        </React.Fragment>
    )
}

export default Hamburger
