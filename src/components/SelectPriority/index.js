import { useRef } from 'react'
import { useClickOutside } from '../../utils/useClickOutside'
import veryHigh from '../../icon/priority/very-high.svg'
import high from '../../icon/priority/high.svg'
import medium from '../../icon/priority/medium.svg'
import low from '../../icon/priority/low.svg'
import veryLow from '../../icon/priority/very-low.svg'
import check from '../../icon/sort/check.svg'
import { priorityIcon } from '../../utils/priorityIcon'
import { toTitleCase } from '../../utils'

const SelectPriority = (props) => {
    const { className, priority, setPriority, visible, handleClose } = props
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, handleClose);
    // console.log(wrapperRef);
    const data = [
        {
            label: 'Very High',
            value: 'very-high',
            icon: veryHigh,
            selected: false,
        },
        {
            label: 'High',
            value: 'high',
            icon: high,
            selected: false,
        },
        {
            label: 'Medium',
            value: 'normal',
            icon: medium,
            selected: false,
        },
        {
            label: 'Low',
            value: 'low',
            icon: low,
            selected: false,
        },
        {
            label: 'Very Low',
            value: 'very-low',
            icon: veryLow,
            selected: false,
        }
    ]
    const sel = data
    const filter = data.filter((el) => el.value === priority.value)[0]
    const i = data.indexOf(filter)
    if (i >= 0) {
        sel[i].selected = true
    }
    console.log('================')
    console.log('ori', priority.label)
    console.log('title', toTitleCase(priority.label))
    return (
        <div data-cy="modal-add-priority-dropdown" ref={wrapperRef} className={`w-48 z-10 fixed bg-white outline outline-gray-300 border-current outline-1 shadow-xl rounded-b-md divide-y ${!visible && 'hidden'} ${className}`}>
            {sel.map((val, index) => {
                return (
                    <div className='flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-200 active:bg-sky-400 active:text-white'
                        key={index}
                        onClick={() => {
                            setPriority((prev) => prev === val.value ? null : { value: val.value, label: toTitleCase(val.label) })
                            handleClose()
                        }}
                    >
                        <div className='flex'>
                            <img src={val.icon} alt='icon' width='10px' height='100%' />
                            <span className='ml-3'>
                                {val.label}
                            </span>
                        </div>
                        {val.selected &&
                            <img src={check} alt='icon' width='20px' height='100%' />
                        }
                    </div>
                )
            })}
        </div>)

}

export default SelectPriority