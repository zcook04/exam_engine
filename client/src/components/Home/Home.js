import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Home = (props) => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <h1>Home</h1>
    )
};

export default Home;