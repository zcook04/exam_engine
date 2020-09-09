import React, { useContext, useEffect } from 'react';
import ContributeExam from './ContributeExam'

import AuthContext from '../../context/auth/authContext';

const Contribute = () => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="contibute-page">
            <ContributeExam />
        </div>
    )
};

export default Contribute;