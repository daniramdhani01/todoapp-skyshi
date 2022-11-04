import az from '../../icon/sort/az.svg'
import za from '../../icon/sort/za.svg'
import belumSelesai from '../../icon/sort/belum-selesai.svg'
import terbaru from '../../icon/sort/terbaru.svg'
import terlama from '../../icon/sort/terlama.svg'
import check from '../../icon/sort/check.svg'
import { useEffect, useRef } from 'react'
import { useClickOutside } from '../../utils/useClickOutside'

const Dropdown = (props) => {
    const { className, sortby, setSortby, visible, handleClose } = props
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, handleClose);
    // console.log(wrapperRef);
    const data = [
        {
            label: 'Terbaru',
            icon: terbaru,
            selected: false,
        },
        {
            label: 'Terlama',
            icon: terlama,
            selected: false,
        },
        {
            label: 'A-Z',
            icon: az,
            selected: false,
        },
        {
            label: 'Z-A',
            icon: za,
            selected: false,
        },
        {
            label: 'Belum Selesai',
            icon: belumSelesai,
            selected: false,
        }
    ]
    const sortlist = data
    const i = !!sortby ? data.indexOf(data.filter((el) => el.label === sortby)[0]) : -1
    // console.log(i)
    if (i >= 0) {
        sortlist[i].selected = true
    }


    return (
        <div data-cy="sort-selection" ref={wrapperRef} className={`w-60 bg-white outline outline-gray-300 outline-2 shadow-xl rounded-xl z-10 fixed divide-y border-current ${!visible && 'hidden'} ${className}`}>
            {sortlist.map((val, index) => {
                return (
                    <div className='flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200 active:bg-sky-400 active:text-white'
                        key={index}
                        onClick={() => {
                            setSortby((prev) => prev === val.label ? null : val.label)
                            handleClose()
                        }}
                    >
                        <div className='flex'>
                            <img src={val.icon} alt='icon' width='25px' height='100%' />
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

export default Dropdown