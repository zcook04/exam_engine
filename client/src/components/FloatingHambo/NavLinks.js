import React, {useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext'

import './NavLinks.css'

const NavLinks = (props) => {
    const authContext = useContext(AuthContext)
    const { navOpen, setNavOpen } = props
    const { isAuthenticated, logout, user } = authContext

    console.log(user)

    const wrapperClass = navOpen ? "navlinks-wrapper" : "navlinks-wrapper hidden"
    const containerClass = navOpen ? "navlinks-container" : "navlinks-container hidden"

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    const navlinkHandler = () => {
        navOpen ? setNavOpen(false) : setNavOpen(true)
    }

    return (
        <div className={containerClass}>
            <div className={wrapperClass}>
            <h1>Hello {user ? user.name : 'Guest'}</h1>
                <ul className="navlinks-ul">
                    <NavLink exact to="/" className="navlinks-a" activeClassName="active" onClick={navlinkHandler}><li className="navlinks-li" >Home</li></NavLink>
                    <NavLink to="/exam" className="navlinks-a" onClick={navlinkHandler}><li className="navlinks-li">Practice An Exam</li></NavLink>
                    <NavLink to="/exam" className="navlinks-a" onClick={navlinkHandler}><li className="navlinks-li">Flip Flashcards</li></NavLink>
                    <NavLink to="/contribute" className="navlinks-a" activeClassName="active" onClick={navlinkHandler}><li className="navlinks-li">Contribute</li></NavLink>
                    <NavLink to="/forum" className="navlinks-a" activeClassName="active" onClick={navlinkHandler}><li className="navlinks-li">Forum</li></NavLink>
                    {authContext.isAuthenticated ?
                    <NavLink to="/logout" className="navlinks-a" activeClassName="active" onClick={navlinkHandler, logout}><li className="navlinks-li" >Logout</li></NavLink> :
                    <NavLink to="/login" className="navlinks-a" activeClassName="active" onClick={navlinkHandler}><li className="navlinks-li" >Login / Register</li></NavLink>}
                </ul>
            </div>
        </div>
    )
}

export default NavLinks
