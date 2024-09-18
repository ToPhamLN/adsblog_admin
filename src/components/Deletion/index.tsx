import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '~/api/axios'
import { Spinner } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface Props {
  setExit: () => void
  api: string
  navigation?: boolean
  refreshHandle: () => Promise<void>
}

const Deletion = ({
  setExit,
  api,
  navigation = false,
  refreshHandle
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await axios.delete(api)
      toast.success(res.data.message ?? 'Success')

      if (navigation) {
        navigate(-1)
      }
      await refreshHandle()
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed__container'>
      <div className='delete__playlist__card'>
        <h2>Are u sure about that?</h2>
        <div className='control'>
          <button className='delete' onClick={handleDelete}>
            {loading ? <Spinner /> : 'Oke'}
          </button>
          <button className='exit' onClick={setExit}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default Deletion
