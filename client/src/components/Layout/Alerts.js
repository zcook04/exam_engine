import React, {useContext} from 'react';
import AlertContext from '../../context/alert/alertContext'

import './Alerts.css'

const Alerts = () => {
    const alertContext = useContext(AlertContext)
    return ( 
        (alertContext.alerts.length) > 0 && 
        (alertContext.alerts.map(alert => (
            <div key={alert.id} className={"alert"}>
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        ))
    ))
};

export default Alerts;