import React, { useReducer } from 'react'
import NavContext from './navContext'
import navReducer from './navReducer'
import {
    NAV_OPEN,
    NAV_CLOSE
} from '../types'

const AuthState = props => {
    const initialState = {
        navIsOpen: false,
    }

    const [state, dispatch] = useReducer(navReducer, initialState)

    return (
        <NavContext.Provider
            value={{
                navIsOpen: state.navIsOpen,
            }}
        >
            {props.children}
        </NavContext.Provider>
    )
}

export default AuthState