import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../../../actions/authActions';
import { incIndex, decIndex } from '../../../../actions/flashcardActions'

const Flashcard = (props) => {
    const { incIndex, decIndex } = props
    const { flashcards, index } = props.flashcards

    const [currentSide, setCurrentSide] = useState('front')

    const incrementIndex = () => {
        setCurrentSide('front')
        incIndex()
    }

    const decrementIndex = () => {
        setCurrentSide('front')
        decIndex()
    }

    const flipHandler = () => {
        setCurrentSide(currentSide === 'front' ? 'back' : 'front')
    }

    return <div className="flashcard"> 
        {currentSide === 'front' ? flashcards[index].sidea : flashcards[index].sideb}
        <button onClick={decrementIndex}>Previous</button>
        <button onClick={incrementIndex}>Forward</button>
        <button onClick={flipHandler}>Flip</button>
        </div>
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  flashcards: state.flashcards
});

export default connect(mapStateToProps, { loadUser, incIndex, decIndex })(Flashcard);
