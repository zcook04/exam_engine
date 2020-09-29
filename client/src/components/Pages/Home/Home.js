import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/authActions';
import HomeCard from './HomeCard/HomeCard'

import './Home.css'

const Home = (props) => {
  const { auth } = props;
  useEffect(() => {
    auth.token !== null && auth.token && loadUser();
    // eslint-disable-next-line
  }, [auth.token]);

  return (

  <div className="home-container">
    <div className="home-card-container">
      <HomeCard 
        title="Practice An Exam" 
        description="Choose from multiple exams and select questions based on categories."
        cta="Start An Exam"
        direction="left" />
        <HomeCard 
        title="Join The Community" 
        description="Help expand the knowledge base by adding content"
        cta="Join For Free"
        direction="right" />
      <HomeCard 
        title="Practice Flashcards" 
        description="Practice flashcards based on real exams."
        cta="Flip Flashcards"
        direction="left" />

    </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Home);
