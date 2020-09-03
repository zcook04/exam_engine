import React, { useState } from 'react'
import AlertContext from '../../context/alert/alertContext'

import './Login.css'

const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const [registered, setRegistered] = useState(true)

    const { password, email, password2, name } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        console.log('Login Submit')
    }

    const showRegistration = registered ? "hidden" : ""
    const showLogin = registered ? "" : "hidden"

    const registrationHandler = () => {
        registered ? setRegistered(false) : setRegistered(true)
    }

    return (
        <div className={"form-container"}>
            <div className={"login-form " + showLogin}>
                <form>
                    <h2><span className="text-primary"> Sign-In</span></h2>
                    <div className="form-group">
                        <input placeholder="Email" type="text" name="Email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input placeholder="Password" type="password" name="password" value={password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="login" onSubmit={onSubmit} className="login-button"/>
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
            <p>Already have an account?  <span className="button" onClick={registrationHandler}>Sign-in now!</span></p>
            </div>
        </div>
    )
}

export default Login