import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Flashcards = (props) => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <h1>FLASHCARDS</h1>
    )
};

export default Flashcards;