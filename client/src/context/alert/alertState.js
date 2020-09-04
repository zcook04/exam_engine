import React, { useReducer } from 'react'
import uuid from 'uuid'

import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {
    const initialState = []

    //CREATE ALERTS
    const setAlert =(msg, timeout = 5000) => {
        const id = uuid.v4()
        dispatch({
            type: SET_ALERT,
            payload: { msg, id }
        })

        setTimeout(() => {
            dispatch({type: REMOVE_ALERT, payload: id})
        }, timeout)
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState