import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Contribute = (props) => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <h1>CONTRIBUTE</h1>
    )
};

export default Contribute;