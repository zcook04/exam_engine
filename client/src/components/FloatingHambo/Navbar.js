import React, {useState, useContext} from 'react'

import NavLinks from './NavLinks'
import Hamburger from './Hamburger'
import Overlay from './Overlay'

import './Navbar.css'

 const Navbar = () => {
     const [navOpen, setNavOpen] = useState(false)

    return (
        <React.Fragment>
            <NavLinks navOpen={navOpen} setNavOpen={setNavOpen} />
            <Hamburger navOpen={navOpen} setNavOpen={setNavOpen} />                
            <Overlay navOpen={navOpen} setNavOpen={setNavOpen} />
        </React.Fragment>
    )
}

export default Navbar