import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '~/api/axios'
import Deletion from '~/components/Deletion'

type Blog = TBlog
type Props = {
  blog: Blog
  getData: () => Promise<void>
}

const BlogItem = ({ blog, getData }: Props) => {
  const [showDel, setShowDel] = useState(false)
  const navigate = useNavigate()

  const viewHandler = () => {
    navigate(`/blogs/${blog._id}`)
  }

  const updateHandler = () => {
    navigate(`/blogs/edit/${blog._id}`)
  }

  const deleteHandler = () => {
    setShowDel((p) => !p)
  }

  const setExit = () => setShowDel((p) => !p)

  return (
    <>
      <article className='card'>
        <div className='control'>
          <button className='btn view' onClick={viewHandler}>
            View
          </button>
          <button className='btn update' onClick={updateHandler}>
            Update
          </button>
          <button className='btn delete' onClick={deleteHandler}>
            Delete
          </button>
        </div>
        <div className='title'>
          <h4>{blog.title}</h4>
        </div>
        <div className='image'>
          <img
            src={`${BASE_URL}/${blog.mainImage.path}`}
            alt={blog.mainImage.filename}
          />
        </div>
        <div
          className='info'
          dangerouslySetInnerHTML={{
            __html: blog.content
          }}
        ></div>
      </article>
      {showDel && (
        <Deletion
          setExit={setExit}
          api={`/api/blogs/delete/${blog._id}`}
          refreshHandle={getData}
        />
      )}
    </>
  )
}

export default BlogItem
