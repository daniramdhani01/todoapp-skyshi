// import logo from './logo.svg';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Headers';
import Modal from '../../components/Modal';
import { toAbsoluteUrl, API, config } from '../../utils'
import Swal from 'sweetalert2'

function LadningPage() {
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [groupList, setGroupList] = useState([{ title: '', created_at: '', id: '' }])
  const show = false
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const getGroup = async () => {
    try {
      const res = await API.get('activity-groups', { params: { email: config.email } })
      const data = res?.data?.data
      setGroupList(data)
    } catch (err) {
      console.log(err)
    }
  }

  const addGroup = async () => {
    try {
      const res = await API.post('activity-groups', {
        email: config.email,
        title: 'New Activity',
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteGroup = async (param) => {

    const { id, title } = param
    const html = `<p>Apakah anda yakin menghapus activity</p><p><b>“${title}”?</b></p>`
    await Swal.fire({
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
    }).then(async (res) => {
      try {
        if (res.isConfirmed) {
          const res = await (await API.delete(`activity-groups/${id}`))

          Swal.fire({
            // position: 'top-end',
            html: `
                  <div style="display:flex; align-items:center;">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 6V10" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 14H10.01" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span data-cy="modal-information" style="margin-left:10px; font-weight:bold;">Activity berhasil dihapus</span>
                  </div>
                  `,
            showConfirmButton: false,
            timer: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }

    })
  }

  useEffect(() => {
    getGroup()
  }, [])

  return (
    <div>
      {/* <Modal/> */}
      <Header />
      <div className="container mx-auto pt-8 px-10 md:px-28">
        <div className="flex flex-wrap justify-between">
          <span className="text-3xl font-bold" data-cy="activity-title">Activity</span>
          <Button onClick={() => addGroup().then(getGroup)}>+ Tambah</Button>
        </div>

        <div data-cy="activity-item">
          {groupList.length < 1 ?
            <div className='flex justify-center mt-20' data-cy="empty-state-dashboard">
              <img src={toAbsoluteUrl('/media/activity-empty-state.png')} width='600px' height='100%' alt="empty" />
            </div>
            :
            <div className={`mt-10 grid grid-cols-1 md:grid-cols-4 gap-4`} data-cy="dashboard-activity">
              {groupList.map((v, index) => {
                return (
                  <div key={index} className='bg-white p-5 rounded-xl drop-shadow-md transition duration-150 ease-in-out'>
                    <div className='font-bold h-52 overflow-auto cursor-pointer' onClick={() => navigate(`item-list/${v.id}`)}>
                      <span className='text-lg'>{v.title}</span>
                    </div>
                    <div className='flex justify-between items-center mt-3'>
                      <span className='text-gray-400'>{moment(v.created_at).format(config.dateFormat)}</span>
                      <button data-cy="activity-item-delete-button" onClick={() => deleteGroup(v).then(getGroup)}>
                        <i className='fa fa-trash text-gray-400 fa-lg cursor-pointer hover:text-gray-300'></i>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default LadningPage;
