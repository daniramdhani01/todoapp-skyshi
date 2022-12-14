import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import SelectPriority from '../../components/SelectPriority'
import Button from '../../components/Button'
import { priorityIcon } from '../../utils/priorityIcon'
import arrowDown from '../../icon/priority/arrow-down.svg'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { API, toTitleCase } from '../../utils'
import { useParams } from 'react-router-dom'

function AddTodo(props) {
    const { visible, handleClose, data, setRefresh } = props
    const {id} = useParams()
    const p = {
        label: "Very High",
        value: "very-high",
    }
    const [priority, setPriority] = useState(p)
    const [showSelect, setShowSelect] = useState(false)

    const formik = useFormik({
        validationSchema: Yup.object({
            activity_group_id: Yup.string().required(),
            priority: Yup.string().required(),
            title: Yup.string().required(),
        }),
        initialValues: {
            activity_group_id: `${id}`,
            priority: '',
            title: '',
        },
        onSubmit: async (v) => {
            try {
                console.log('adaa')
                if(!data){
                    const res = await API.post('/todo-items',v)
                }else{
                    const res = await API.patch(`/todo-items/${data?.id}`,v) 
                }
                setRefresh((prev)=>!prev)
                handleClose()
            } catch (err) {
                console.log(err)
            }
        }
    })
console.log('dataa', data)
    useEffect(() => {
        if(!visible){
            formik.resetForm()
        }
        if (!visible || !!data) {
            setPriority(p)
        }
        if (data) {
            setPriority(data?.priority)
            formik.setFieldValue('title', data?.title)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, visible])

    useEffect(()=>{
        if(priority?.value){
            formik.setFieldValue('priority', priority?.value)
        }
    },[priority])
    // console.log(data)
    console.log(formik.values);
    return (
        <Modal visible={visible} handleClose={handleClose} headerName='Tambah List Item' btn={<span data-cy="modal-add-save-button"><Button onClick={()=>formik.submitForm()} isLoading={formik.isLoading}>Simpan</Button></span>}>
            <label className='flex flex-col' data-cy="add-new">
                <span className='mb-2 font-bold text-sm'>NAMA LIST ITEM</span>
                <input
                data-cy="modal-add-name-input"
                    name='title'
                    type={'text'}
                    placeholder='Tambahkan nama list item'
                    className='border rounded-md focus:outline-1 focus:outline-sky-400 p-3'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={()=>formik.setFieldTouched('title', true)}
                />
                <span className='text-sm text-red-300'>{formik.errors.title}</span>
            </label>

            <div className='flex flex-col mt-10'>
                <span className='mb-2 font-bold text-sm'>PRIORITY</span>
                <div className='w-48 '>
                    <button
                        className={`w-full p-3 flex justify-between border-current outline outline-gray-300 outline-1 ${showSelect ? 'rounded-t-md bg-gray-200' : 'rounded-md'}`}
                        onClick={() => setShowSelect(true)}>
                        <div className='flex'>
                            {showSelect ?
                                <span className='ml-4'>Pilih priority</span>
                                :
                                <><img src={priorityIcon(priority.value)} alt='icon' width='10px' height='100%' className='mr-2' />  {toTitleCase(priority.label)} </>}
                        </div>
                        <img src={arrowDown} alt='select' className={`transition duration-300 ease-in-out ${showSelect && 'rotate-180'}`} />
                    </button>
                    <SelectPriority visible={showSelect} handleClose={() => setShowSelect(false)} priority={priority} setPriority={setPriority} />
                </div>
            </div>
        </Modal>
    )
}

export default AddTodo