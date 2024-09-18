import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'
import Panigation from '~/components/Panigation'
import { SmallAddIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import axios from '~/api/axios'
import LoadingPage from '~/components/LoadingPage'

type Props = {}
type Blogs = TBlog[]

const Blogs = (props: Props) => {
  const [data, setData] = useState<Blogs>([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleCreate = () => {
    navigate('/blogs/create')
  }
  const getBlogs = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/blogs/read/all')
      setData(res.data.blogs)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getBlogs()
  }, [])
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <section className='categories'>
          <div className='container'>
            <div className='heading' style={{ marginBottom: '20px' }}>
              <div className='search'>
                <input type='text' />
                <button className='close'>
                  <SearchIcon />
                </button>
              </div>
              <button className='tran create' onClick={handleCreate}>
                <SmallAddIcon />
              </button>
            </div>
            <div className='list'>
              {data?.length > 0 &&
                data.map((item) => (
                  <BlogItem key={item._id} blog={item} getData={getBlogs} />
                ))}
            </div>
            <Panigation />
          </div>
        </section>
      )}
    </>
  )
}

export default Blogs
