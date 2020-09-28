import React, { useState } from 'react';
import { connect } from 'react-redux';

const FlashcardCategory = (props) => {
  const [count, setCount] = useState(props.category.count);

  const changeHandler = (e) => {
    setCount(e.target.value);
    props.updateCategories(e.target.name, e.target.value)
  };

  // Remove '-' from category name and replace with spaces
  const displayName = props.category.name.split('-').join(' ');

  return (
    <div className="exam-category-card">
      <div className="category-count">
        {props.category.count}/{props.category.max}
      </div>
      <div className="category-slider">
        <input
          id="category-slider"
          type="range"
          value={count}
          name={props.category.name}
          max={props.category.max}
          onChange={changeHandler}
        />
      </div>
      <div className="category-display-name">{displayName}</div>
    </div>
  );
};

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  flashcards: state.flashcards,
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardCategory);
