import React from 'react'

function CheckBox(props) {
    const {children, value, title, onChange} = props
    //(e) => ''handleActive({ id: val.id, priority: val.priority, is_active: e.target.checked })
    return (
        <>
            <input type="checkbox" name='active' className='w-7' onChange={onChange} checked={!value}/>
            {children}
            <span className={`text-lg ${!value && 'line-through text-gray-400'}`}>{title}</span>
        </>
    )
}

export default CheckBox