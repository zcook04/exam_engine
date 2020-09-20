import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {

} from '../../../../actions/flashcardActions';

const SearchFlashcards = (props) => {
  const {

  } = props;
  const {  } = props.flashcards;

  const flashcardHandler = () => {
      
  }

  return (
    <div className="exam-search-container">
        <select onChange={flashcardHandler} name="flashcard-title" id="flashcard-title">
          <optgroup label="FlashcardTitles">
            <option defaultValue>Select an exam to get started</option>
          </optgroup>
        </select>
    </div>
  );
};

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  flashcards: state.flashcards,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlashcards);
