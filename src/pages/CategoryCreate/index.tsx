import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { pathRouter } from '~/constants/routes'
import axios from '~/api/axios'
import { toast } from 'react-toastify'

type Props = {}

const CategoryCreate = (props: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null
  })
  const [loadingSubmit, setLoadingSubmit] = useState(false)

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
      const response = await axios.post('/api/categories/create', form, {
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

  return (
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
              {loadingSubmit ? <Spinner /> : 'Create'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CategoryCreate
