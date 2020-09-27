import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import {

} from '../../../../actions/flashcardActions';

const SearchFlashcards = (props) => {
  const [flashcardObjs, setFlashcardObjs] = useState([])
  const [flashcardTitles, setFlashcardTitles] = useState([])
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])

  //GET ALL FLASHCARD TITLES/OBJS
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios('/api/flashcards/titles')
      const titles = []
      results.data.forEach(result => {
        titles.push(result.exam)
      })
      setFlashcardTitles(titles)
      setFlashcardObjs(results.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const currentExam = flashcardObjs.filter(allTitles => allTitles.exam === title)[0]
    currentExam && setCategories(currentExam.categories)
  }, [title])

  const flashcardHandler = (e) => {
    if(e.target.name === 'flashcard-title') {
      setTitle(e.target.value)
    }

  }

  return (
    <div className="exam-search-container">
        <select onChange={flashcardHandler} name="flashcard-title" id="flashcard-title">
          <optgroup label="FlashcardTitles">
            <option defaultValue>Select an exam to get started</option>
            {flashcardTitles.map(titleOpt => <option key={titleOpt} value={titleOpt} name={titleOpt}>{titleOpt}</option>)}
          </optgroup>
        </select>
        {categories && categories.map(cat => <h1 key={cat}>{cat}</h1>)}
    </div>
  );
};

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  flashcards: state.flashcards,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlashcards);
