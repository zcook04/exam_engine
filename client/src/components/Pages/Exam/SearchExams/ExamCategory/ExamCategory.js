import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateCategories } from '../../../../../actions/examActions';

import './ExamCategory.css';

const ExamCategory = (props) => {
  const [count, setCount] = useState(props.category.count);

  const changeHandler = (e) => {
    const newCategories = props.exam.categories;
    for (let i = 0; i < newCategories.length; i++)
      if (newCategories[i].name === e.target.name) {
        newCategories[i].count = e.target.value;
      }
    setCount(e.target.value);
    props.updateCategories(newCategories);
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
  updateCategories,
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamCategory);
