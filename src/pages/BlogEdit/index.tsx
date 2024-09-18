import React, { useState, useEffect } from 'react'
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
import { useParams } from 'react-router-dom'
import LoadingPage from '~/components/LoadingPage'

type Props = {}

const BlogEdit = (props: Props) => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    category: '',
    content: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { _id } = useParams()

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/blogs/read/${_id}`)
        setFormData(res.data.blog)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getBlog()
  }, [])

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
    setLoadingSubmit(true)

    e.preventDefault()
    const form = new FormData()
    form.append('title', formData.title)
    form.append('category', formData.category)
    form.append('content', formData.content)
    if (formData.image) {
      form.append('image', formData.image)
    }

    try {
      const response = await axios.put(`/api/blogs/update/${_id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success(response.data?.message, {
        autoClose: 1000
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update blog', {
        autoClose: 1000
      })
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
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

                <FormControl id='image' className='input_box'>
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
                  {loadingSubmit ? <Spinner /> : 'Update'}
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default BlogEdit
