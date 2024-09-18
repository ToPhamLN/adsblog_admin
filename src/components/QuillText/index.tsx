import React from 'react'
import ReactQuill from 'react-quill'
import { FormControl, FormLabel } from '@chakra-ui/react'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
}
type Props = {
  value: string
  onChangeHandler: (value: string) => void
}

const QuillText = ({ value, onChangeHandler }: Props) => {
  return (
    <FormControl id='content' isRequired className='input_box'>
      <FormLabel>Content</FormLabel>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={onChangeHandler}
        modules={modules}
        placeholder='Write something amazing...'
      />
    </FormControl>
  )
}

export default QuillText
