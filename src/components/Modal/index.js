import React, { useRef } from 'react'
import { useClickOutside } from '../../utils/useClickOutside';

function Modal(props) {
    const { children, visible, handleClose, headerName, btn } = props
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, handleClose);
    // console.log(wrapperRef);

    return (
        <>
            <div ref={wrapperRef} className={` justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${!visible && 'hidden'}`}>
                <div className="relative w-auto my-6 mx-auto">
                    {/*content*/}
                    <div style={{width:'800px'}} className=" border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-lg font-bold">
                                {headerName}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={handleClose}
                            >
                                <span className="text-black bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    <i className='fa fa-times text-gray-400'></i>
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {children}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            {btn}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${!visible && 'hidden'} fixed inset-0 z-40 backdrop-blur-sm bg-black/20`}></div>
        </>
    )
}

export default Modal