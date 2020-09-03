import React from 'react'

import './Overlay.css'

const Overlay = (props) => {
    const { navOpen } = props

    let openClass = navOpen ? "open" : ""

    return (
        <div className={'menu-overlay-container ' + openClass}>
            <div className={"menu-overlay " + openClass}>
            </div>
        </div>
    )
}

export default Overlay