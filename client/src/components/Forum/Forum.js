import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Forum = (props) => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <h1>Forum</h1>
    )
};

export default Forum;