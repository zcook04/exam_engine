import React, { useState, useContext, useEffect } from 'react'

import './Login.css'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { register, error, clearErrors, isAuthenticated } = authContext

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }

        if(error === 'User already exists') {
            setAlert(error)
            clearErrors()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })



    const [registered, setRegistered] = useState(true)

    const { password, email, password2, name } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onRegister = e => {
        e.preventDefault()
        if(name === '' || email === '' || password === '') {
            setAlert('Please enter all fields.')
        } else if (password !== password2) {
            setAlert('Passwords do not match')
        } else {
            register({
                name,
                email,
                password
            })
        }

    }

    const onSignin = e => {
        e.preventDefault()
        console.log('Login Submit')
    }

    const showRegistration = registered ? "hidden" : ""
    const showLogin = registered ? "" : "hidden"

    const registrationHandler = () => {
        registered ? setRegistered(false) : setRegistered(true)
        setUser({
            name: '',
            email: '',
            password: '',
            password2: '',
        })
    }

    return (
        <div className={"form-container"}>
            <div className={"login-form " + showLogin}>
                <form>
                    <h2><span className="text-primary"> Sign-In</span></h2>
                    <div className="form-group">
                        <input placeholder="Email" type="text" name="email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input required placeholder="Password" type="password" name="password" value={password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" onClick={onSignin} className="login-button"/>
                    </div>
                    <p>Don't have an account?  <span className="button" onClick={registrationHandler}>Register now!</span></p>
                </form>
            </div>
            <div className={"register-form " + showRegistration}>
                <h2>Welcome <span className="text-primary"> {user.name}</span></h2>
                <div className="form-group">
                    <input placeholder="Name" type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input placeholder="Email" type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input placeholder="Password" type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input placeholder="Confirm Password" type="password" name="password2" value={password2} onChange={onChange}/>
                </div>
                <div className="form-group">
                        <input type="submit" value="Register" onClick={onRegister} className="login-button"/>
                    </div>
            <p>Already have an account?  <span className="button" onClick={registrationHandler}>Sign-in now!</span></p>
            </div>
        </div>
    )
}

export default Login