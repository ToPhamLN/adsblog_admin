import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner
} from '@chakra-ui/react'
import axios from '~/api/axios'
import { toast } from 'react-toastify'
import SelectCategories from '~/components/SelectCategories'
import QuillText from '~/components/QuillText'

type Props = {}

const BlogCreate = (props: Props) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    category: '',
    content: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    form.append('title', formData.title)
    form.append('category', formData.category)
    form.append('content', formData.content)
    if (formData.image) {
      form.append('image', formData.image)
    }

    try {
      const response = await axios.post('/api/blogs/create', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success(response.data?.message, {
        autoClose: 1000
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create blog', {
        autoClose: 1000
      })
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <section>
      <div className='container'>
        <h2 style={{ marginBottom: '10px' }}>Create Blog</h2>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <FormControl id='title' isRequired className='input_box'>
              <FormLabel>Title</FormLabel>
              <Input
                type='text'
                name='title'
                placeholder='Enter blog title'
                variant='outline'
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormControl>

            <SelectCategories
              value={formData.category}
              onChangeHandler={handleInputChange}
            />

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

            <QuillText
              value={formData.content}
              onChangeHandler={(value) =>
                setFormData({ ...formData, content: value })
              }
            />

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

export default BlogCreate
