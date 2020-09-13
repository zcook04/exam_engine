import React from 'react';
import { connect } from 'react-redux';

import './ExamCategories.css';

import { updateCategories } from '../../actions/examActions';

const ExamCategories = (props) => {
  const { categories } = props.exam;
  const { updateCategories } = props;

  const changeHandler = (e) => {
    const newCategories = categories;
    for (let i = 0; i < newCategories.length; i++)
      if (newCategories[i].name === e.target.name) {
        newCategories[i].count = e.target.value;
      }
    updateCategories(newCategories);
  };

  return (
    <div className="category-container">
      {categories.map((category) => {
        return (
          <h3 key={category.name}>
            <input
              type="number"
              min="0"
              max={category.max}
              defaultValue={category.count}
              name={category.name}
              onChange={changeHandler}
            />
            {category.name}
          </h3>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = {
  updateCategories,
};

const mapStateToProps = (state) => ({
  exam: state.exam,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamCategories);
