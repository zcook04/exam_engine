import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import ExamCategory from '../../Exam/SearchExams/ExamCategory/ExamCategory'

import {

} from '../../../../actions/flashcardActions';

const SearchFlashcards = (props) => {
  const [flashcardTitles, setFlashcardTitles] = useState([])
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])

  //GET ALL FLASHCARD TITLES/OBJS
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios('/api/flashcards/titles')
      const titles = results.data.map(result => result.exam)
      setFlashcardTitles(titles)
    }
    fetchData()
  }, [])

  //UPDATE CATEGORIES WHEN TITLE CHANGES
  useEffect(() => {
    const getCategories = async () => {
      try {
        const allCategories = await axios.get(`/api/flashcards/${(title || 'noexam')}/categories`)
        if(allCategories && allCategories.status !== 204) {
          setCategories(allCategories.data)
        } else {
          setCategories([])
        }
      } catch (err) {
        console.log(err)
        setCategories([])
      }
    }
    getCategories()
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
        {categories && categories.map(cat =>                
          <ExamCategory
            category={cat}
            key={cat.name}
            max={cat.max}
          />)}
    </div>
  );
};

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  flashcards: state.flashcards,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlashcards);
