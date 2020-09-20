import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../../actions/authActions';

import {SearchFlashcards} from './SearchFlashcards/SearchFlashcards'

const Flashcards = (props) => {
  const { auth } = props;
  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

  return <div className="flashcard-page">
    </div>
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Flashcards);
