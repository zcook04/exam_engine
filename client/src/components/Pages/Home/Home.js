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
        ctaLink="/exam"
        />
        {!auth.isAuthenticated ? <HomeCard 
        title="Join The Community" 
        description="Help expand the knowledge base by adding content"
        cta="Join For Free"
        ctaLink="/login"
        /> :
        <HomeCard 
        title="Contribute Content" 
        description="Help expand the knowledge base by adding exam questions or flashcards"
        cta="Add Content"
        ctaLink="/contribute"
        />}
      <HomeCard 
        title="Practice Flashcards" 
        description="Practice flashcards based on real exams."
        cta="Flip Flashcards"
        ctaLink="/flashcards"
        />

    </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Home);
