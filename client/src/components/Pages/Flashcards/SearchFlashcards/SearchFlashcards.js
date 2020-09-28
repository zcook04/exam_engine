import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import FlashcardCategory from './FlashcardCategory/FlashcardCategory'

import {
  loadCards,
  resetCards
} from '../../../../actions/flashcardActions';

const SearchFlashcards = (props) => {
  const { loadCards, resetCards } = props
  const { cardsLoaded } = props.flashcards

  const [flashcardTitles, setFlashcardTitles] = useState([])
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])

  //GET ALL FLASHCARD TITLES/OBJS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios('/api/flashcards/titles')
        setFlashcardTitles(results.data.map(result => result.exam))
      }
      catch (err){
        console.error(err)
        setFlashcardTitles([])
      }
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
    setTitle(e.target.value)
  }

  const flashcardLoader = () => {
    loadCards(title, categories)
  }

  const flashcardReset = () => {
    resetCards()
  }

  const updateCategories = (name, count) => {
      const newCategories = categories[0]
      setCategories([{...newCategories, name, count}])
  }

  return (
    <div className="exam-search-container">
        <select onChange={flashcardHandler} name="flashcard-title" id="flashcard-title">
          <optgroup label="FlashcardTitles">
            <option defaultValue>Select an exam to get started</option>
            {flashcardTitles.map(titleOpt => <option key={titleOpt} value={titleOpt} name={titleOpt}>{titleOpt}</option>)}
          </optgroup>
        </select>
        {cardsLoaded ? <button className='flashcard-loader' onClick={flashcardReset}>Reset Cards</button> : <button className='flashcard-loader' onClick={flashcardLoader}>Load Cards</button>}
        {(categories && !cardsLoaded) && categories.map(cat =>                
          <FlashcardCategory
            category={cat}
            key={cat.name}
            max={cat.max}
            updateCategories={updateCategories}
          />)}
    </div>
  );
};

const mapDispatchToProps = {
  loadCards,
  resetCards
};

const mapStateToProps = (state) => ({
  flashcards: state.flashcards,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlashcards);
