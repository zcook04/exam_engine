import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import './Alerts.css';

const Alerts = (props) => {
  const { alert } = props;

  return (
    alert.length > 0 &&
    alert.map((alert) => {
      switch (alert.alertType) {
        case 'error':
          return (
            <div key={alert.id} className={'alert'}>
              <FontAwesomeIcon icon={faTimesCircle} /> {alert.msg}
            </div>
          );
        case 'success':
          return (
            <div key={alert.id} className={'alert-success'}>
              <FontAwesomeIcon icon={faCheckCircle} /> {alert.msg}
            </div>
          );
        default:
          return (
            <div key={alert.id} className={'alert'}>
              <FontAwesomeIcon icon={faTimesCircle} /> {alert.msg}
            </div>
          );
      }
    })
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alerts);
