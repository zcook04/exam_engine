import React, {useState} from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../../../actions/authActions';
import { incIndex, decIndex } from '../../../../actions/flashcardActions'

import './Flashcard.css'

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

    return <div className="flashcard-container"> 
                <div className="fcard">
                    {currentSide === 'front' ? flashcards[index].sidea : flashcards[index].sideb}
                </div>
                <div className="fcard-nav">
                    <button id="flashcard-previous" className="flashcard-nav-button" onClick={decrementIndex}>Previous</button>
                    <button id="button-flip" className="flashcard-nav-button" onClick={flipHandler}>Flip</button>
                    <button id="flashcard-forward" className="flashcard-nav-button" onClick={incrementIndex}>Forward</button>
                </div>
            </div>
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  flashcards: state.flashcards
});

export default connect(mapStateToProps, { loadUser, incIndex, decIndex })(Flashcard);
