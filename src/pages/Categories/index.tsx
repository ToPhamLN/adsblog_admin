import React, { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import Panigation from '~/components/Panigation'
import { SmallAddIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import axios from '~/api/axios'
import LoadingPage from '~/components/LoadingPage'

type Props = {}
type Category = TCategory
const Categories = (props: Props) => {
  const [data, setData] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleCreate = () => {
    navigate('/categories/create')
  }

  const getCategories = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/categories/read/all')
      setData(res.data.categories)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getCategories()
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
              {data.length > 0 &&
                data.map((item) => (
                  <CategoryItem
                    key={item._id}
                    category={item}
                    getData={getCategories}
                  />
                ))}
            </div>
            <Panigation />
          </div>
        </section>
      )}
    </>
  )
}

export default Categories
