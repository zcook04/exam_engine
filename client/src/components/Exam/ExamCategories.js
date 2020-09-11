import React, { useContext, useState } from "react"

import CategoryInput from './CategoryInput'

import ExamContext from "../../context/exam/examContext"

import "./ExamCategories.css"



const ExamCategories = () => {
  const examContext = useContext(ExamContext)
  const { categories } = examContext
  const [selectedCategories, setSelectedCategories] = useState(categories)


  const changeHandler = (e) => {
    let currentValue = {}
    currentValue[e.target.name] = e.target.value
    setSelectedCategories({...selectedCategories, ...currentValue})
  }


  console.log(selectedCategories)
    return (
            <div className="category-slider-container">
                {categories.map( mapCategory => {
                 const { category, count } = mapCategory
                    return  <CategoryInput name={category} key={category} maxValue={count} changeHandler={changeHandler} />
                        
                })}
            </div>
    );
  }
  
export default ExamCategories;