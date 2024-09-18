import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner
} from '@chakra-ui/react'
import LoadingPage from '~/components/LoadingPage'
import { useNavigate, useParams } from 'react-router-dom'
import { pathRouter } from '~/constants/routes'
import axios from '~/api/axios'
import { toast } from 'react-toastify'

type Props = {}

const CategoryEdit = (props: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null
  })
  const [loading, setLoading] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { _id } = useParams()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'image' && files) {
      setFormData({
        ...formData,
        image: files[0]
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSubmit(true)
    const form = new FormData()
    form.append('name', formData.name)
    if (formData.image) {
      form.append('image', formData.image)
    }

    try {
      const response = await axios.put(`/api/categories/update/${_id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success(response.data?.message, {
        autoClose: 1000
      })
      navigate(pathRouter.categories)
      console.log('Success:', response.data)
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      })
    } finally {
      setLoadingSubmit(false)
    }
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/categories/read/${_id}`)
        setFormData(res.data.category)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getCategory()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <section>
          <div className='container'>
            <h2 style={{ marginBottom: '10px' }}>Create Category</h2>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <FormControl id='name' isRequired className='input_box'>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='text'
                    name='name'
                    placeholder='Enter category name'
                    variant='outline'
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id='image' isRequired className='input_box'>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type='file'
                    name='image'
                    variant='outline'
                    accept='image/*'
                    onChange={handleInputChange}
                  />
                </FormControl>

                <Button
                  type='submit'
                  colorScheme='teal'
                  width='200px'
                  className='btn'
                >
                  {loadingSubmit ? <Spinner /> : 'Updated'}
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default CategoryEdit
