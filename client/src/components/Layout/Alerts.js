import React, {useContext} from 'react';
import AlertContext from '../../context/alert/alertContext'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import './Alerts.css'

const Alerts = () => {
    const alertContext = useContext(AlertContext)
    return ( 
        (alertContext.alerts.length) > 0 && 
        (alertContext.alerts.map(alert => {
            switch(alert.alertType) {
                case 'error':
                    return (
                        <div key={alert.id} className={"alert"}>
                            <FontAwesomeIcon icon={faTimesCircle} /> {alert.msg}
                        </div>
                    )
                case 'success':
                    return (
                        <div key={alert.id} className={"alert-success"}>
                            <FontAwesomeIcon icon={faCheckCircle} /> {alert.msg}
                        </div>
                    )
                default:
                    return (
                        <div key={alert.id} className={"alert"}>
                            <FontAwesomeIcon icon={faTimesCircle} /> {alert.msg}
                        </div>
                    )
            }

            }

            )
    ))
};

export default Alerts;