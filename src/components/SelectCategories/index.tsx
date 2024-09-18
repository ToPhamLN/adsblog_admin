import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

import axios from '~/api/axios'

type Props = {
  value: string
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}
type Categories = TCategory[]

const SelectCategories = ({ value, onChangeHandler }: Props) => {
  const [categories, setCategories] = useState<Categories>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories/read/all')
        setCategories(response.data.categories)
      } catch (error) {
        console.log(error)
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  return (
    <FormControl id='category' isRequired className='input_box'>
      <FormLabel>Category</FormLabel>
      <Select
        placeholder='Select category'
        name='category'
        value={value}
        onChange={onChangeHandler}
      >
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectCategories
