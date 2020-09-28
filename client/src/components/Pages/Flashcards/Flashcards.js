import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClockLoader';
import Flashcard from './Flashcard/Flashcard'

import { loadUser } from '../../../actions/authActions';

import SearchFlashcards from './SearchFlashcards/SearchFlashcards'

const Flashcards = (props) => {
  const { auth, flashcards } = props;


  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

  return <div className="flashcard-page"> 
      <SearchFlashcards/>
      {flashcards.loading && <ClipLoader loading={flashcards.loading} size={200} color={'white'} css={{ margin: 'auto' }} />}
      {flashcards.flashcards.length > 0 && <Flashcard 
        key={flashcards.flashcards[flashcards.index]._id} 
        />}
    </div>
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  flashcards: state.flashcards
});

export default connect(mapStateToProps, { loadUser })(Flashcards);
