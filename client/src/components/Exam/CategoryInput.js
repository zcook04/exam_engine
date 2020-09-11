import React, { useState } from "react"

import './CategoryInput.css'

const CategoryInput = (props) => {
    const {name, maxValue, changeHandler} = props

    const [value, setValue] = useState(maxValue)

    const inputHandler = (e) => {
        changeHandler(e)
        setValue(e.target.value)
    }
    return (
        
        <div className="category-slider">
                <label htmlFor={name}>{name} <p>Questions: {value}</p></label>
                <input type="range" id={name} name={name} min="0" max={maxValue} value={value} onChange={inputHandler}/>
        </div>
    );
  }
  
export default CategoryInput;



