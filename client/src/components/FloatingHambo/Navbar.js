import React, {useState, useContext, useEffect } from 'react'

import NavLinks from './NavLinks'
import Hamburger from './Hamburger'
import Overlay from './Overlay'

import AuthContext from '../../context/auth/authContext'

import './Navbar.css'

 const Navbar = () => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

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