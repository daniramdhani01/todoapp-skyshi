import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from '../../components/Button'
import Header from '../../components/Headers'
import { API, config, toAbsoluteUrl } from '../../utils'
import { priorityIcon } from '../../utils/priorityIcon'
import back from '../../icon/arrow-left.svg'
import sortIcon from '../../icon/dual-arrow.svg'
import Dropdown from '../../components/Dropdown'

import AddTodo from './AddTodo'


function Detail() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(null)

  const [sortby, setSortby] = useState(null)
  const [showDD, setShowDD] = useState(false)

  const [showAdd, setShowAdd] = useState(false)
  // const [priority, setPriority] = useState(null)
  let { id } = useParams()
  const [group, setGroup] = useState([{
    "id": '',
    "title": "",
    "created_at": "",
    "todo_items": []
  }])



  const getGroup = async () => {
    try {
      const res = await API.get(`activity-groups/${id}`)
      const data = res?.data
      setGroup(data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await API.delete(`todo-items/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleActive = async (props)=>{
    try {
      await API.patch(`todo-items/${props.id}`, props)
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleDeleteActivity = (param) => {
    const html = `<p>Apakah anda yakin menghapus activity</p><p><b>“${param}”?</b></p>`
    Swal.fire({
      iconHtml: `<svg width="68" height="61" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 44.5V44.535M34 23.5V30.5V23.5Z" stroke="#ED4C5C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.50018 58.5012H58.5002C59.6423 58.4932 60.765 58.2059 61.7705 57.6643C62.7761 57.1227 63.6338 56.3433 64.2689 55.3941C64.904 54.4449 65.2972 53.3546 65.4142 52.2186C65.5312 51.0825 65.3685 49.935 64.9402 48.8762L40.0902 6.00125C39.4848 4.90714 38.5975 3.99515 37.5203 3.3601C36.4432 2.72504 35.2156 2.39011 33.9652 2.39011C32.7148 2.39011 31.4872 2.72504 30.41 3.3601C29.3329 3.99515 28.4455 4.90714 27.8402 6.00125L2.99018 48.8762C2.56997 49.9108 2.40334 51.0308 2.5042 52.1428C2.60506 53.2549 2.97048 54.3266 3.56996 55.2687C4.16943 56.2107 4.98556 56.9956 5.95022 57.558C6.91487 58.1203 8.00006 58.4438 9.11518 58.5012" stroke="#ED4C5C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      html: html,
      showCancelButton: true,
      cancelButtonColor: '#E5E5E5',//#F4F4F4
      cancelButtonText: '<b>Batal</b>',
      confirmButtonColor: '#ED4C5C',
      confirmButtonText: 'Hapus',
      reverseButtons: true,

      customClass: {
        icon: 'no-border'
      }
    })
  }

  useEffect(() => {
    getGroup()
  }, [refresh])

  return (
    <>
      <Header />
      <AddTodo visible={showAdd} handleClose={() => setShowAdd(false)} data={null} setRefresh={setRefresh}/>
      <div className='container mx-auto pt-8 px-10 md:px-28'>
        <div className="flex flex-wrap justify-between">
          <div className='flex items-center'>
            <button className='cursor-pointer' onClick={() => navigate('/')}>
              <img src={back} alt='back' className='mr-5' />
            </button>
            <span className="text-3xl font-bold">{group?.title}</span>
            <i className='ml-3 fa fa-pencil fa-2x text-gray-400 fa-lg cursor-pointer hover:text-gray-300'></i>
          </div>
          <div className=''>
            <div className='flex'>
              <button className='p-3 rounded-full outline outline-1 outline-gray-400 mr-3' onClick={() => setShowDD(true)}>
                <img src={sortIcon} alt='sort' width={'25px'} />
              </button>
              <Button onClick={() => setShowAdd(true)}>+ Tambah</Button>
            </div>
            <Dropdown className='mt-2' sortby={sortby} setSortby={setSortby} visible={showDD} handleClose={() => setShowDD(false)} />
          </div>
        </div>

        <div className='flex mt-20 flex-col items-center'>

          {group.todo_items?.length < 1 ?
            <img src={toAbsoluteUrl('/media/todo-empty-item.png')} width='500px' height='100%' alt="empty" />
            :
            group?.todo_items?.map((val, index)=>{
            // [1].map((val, index) => {
              return (
                <div className='w-full p-8 rounded-xl bg-white flex justify-between shadow-md mb-3' key={index}>
                  <div className='flex'>
                    <input type="checkbox" name='active' className='' onChange={(e) => handleActive({id:val.id, priority: val.priority, is_active: e.target.checked})} defaultChecked={val.is_active}/>
                    <img src={priorityIcon(val.priority)} alt="priority" className='mx-3' />
                    <span className={`${val.is_active && 'line-through text-gray-400'}`}>{val.title}</span>
                    <i className='ml-3 fa fa-pencil text-gray-400 fa-lg cursor-pointer hover:text-gray-300'></i>
                  </div>
                  <div>
                    <button onClick={() => {
                      handleDeleteActivity('mandi')
                      // deleteTodo()
                    }}>
                      <i className='fa fa-trash text-gray-400 fa-lg cursor-pointer hover:text-gray-300'></i>
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Detail