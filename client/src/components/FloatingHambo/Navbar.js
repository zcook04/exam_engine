import React, {useState} from 'react'

import NavLinks from './NavLinks'
import Hamburger from './Hamburger'
import Overlay from './Overlay'

import './Navbar.css'

 const Navbar = () => {
     const [navOpen, setNavOpen] = useState(false)
     const [showNavLinks, setShowNavLinks] = useState("navlinks-wrapper hidden")

     let burgerMenuBtnClasses = navOpen ? "menu-btn open" : "menu-btn"
     let overlayClasses = navOpen ? "menu-overlay open" : "menu-overlay"
     

     const hamburgerHandler = () => {
        navOpen ? setNavOpen(false) : setNavOpen(true)
        setTimeout(setShowNavLinks(!navOpen ? "navlinks-wrapper" : "navlinks-wrapper hidden"), 1000)
     }



     

    return (
        <React.Fragment>
            <NavLinks navOpen={navOpen} setNavOpen={setNavOpen} />
            <div className="navbar-main">
                <Hamburger hamburgerHandler={hamburgerHandler} burgerMenuBtnClasses={burgerMenuBtnClasses} />
                <Overlay overlayClasses={overlayClasses} />
            </div>
            
        </React.Fragment>
    )
}

export default Navbar