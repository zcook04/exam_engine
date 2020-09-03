import React from 'react'

import './Overlay.css'

const Overlay = (props) => {
    const { overlayClasses } = props
    return (
        <div className={'menu-overlay-container ' + overlayClasses}>
            <div className={"menu-overlay " + overlayClasses}>
            </div>
        </div>
    )
}

export default Overlay