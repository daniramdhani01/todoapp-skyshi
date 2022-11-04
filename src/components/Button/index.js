import React, { useState } from 'react'

function Button(props) {
    const {children, isLoading, onClick, disabled} = props
    return (
        <button data-cy="activity-add-button" className={`w-32 py-3 px-5 rounded-3xl text-white active:bg-sky-300 ${disabled ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-400'}`} onClick={onClick} disabled={disabled}>
            {children} {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-lg"></i> }</button>
    )
}

export default Button