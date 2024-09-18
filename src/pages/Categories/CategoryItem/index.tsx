import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '~/api/axios'
import Deletion from '~/components/Deletion'
type Category = TCategory
type Props = {
  category: Category
  getData: () => Promise<void>
}

const CategoryItem = ({ category, getData }: Props) => {
  const [showDel, setShowDel] = useState(false)

  const navigate = useNavigate()
  const updateHandler = () => {
    navigate(`/categories/edit/${category._id}`)
  }

  const deleteHandler = () => {
    setShowDel((p) => !p)
  }
  const setExit = () => setShowDel((p) => !p)
  return (
    <>
      <article className='card'>
        <div className='control'>
          <div className='control'>
            <button className='btn update' onClick={updateHandler}>
              Update
            </button>
            <button className='btn delete' onClick={deleteHandler}>
              Delete
            </button>
          </div>
        </div>
        <div className='title'>
          <h4>{category.name}</h4>
        </div>
        <div className='image'>
          <img src={`${BASE_URL}/${category.image.path}`} alt='' />
        </div>
      </article>
      {showDel && (
        <Deletion
          setExit={setExit}
          api={`/api/categories/delete/${category._id}`}
          refreshHandle={getData}
        />
      )}
    </>
  )
}

export default CategoryItem
