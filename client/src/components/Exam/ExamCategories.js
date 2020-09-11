import React, { useContext, useState } from "react"

import ExamContext from "../../context/exam/examContext"

import "./ExamCategories.css"



const ExamCategories = () => {
  const examContext = useContext(ExamContext)
  const { categories, updateCategories } = examContext

  const changeHandler = async (e) => {
    const newCategories = categories
    for (let i =0; i < newCategories.length; i++)
      if(newCategories[i].name === e.target.name) {
        newCategories[i].count = e.target.value
      }
      await updateCategories(newCategories)
    }

    return (
            <div className="category-container">
                {categories.map((category) =>{
                    return <h3 key={category.name}>
                      <input type="number" min="0" max={category.max} defaultValue={category.count} name={category.name} onChange={changeHandler}/> 
                      {category.name}
                      </h3>
                })}
            </div>
    );
  }
  
export default ExamCategories;