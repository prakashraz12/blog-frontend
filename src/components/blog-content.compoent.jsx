import React from 'react'
import parse from 'html-react-parser';

const BlogContent = ({content}) => {
  return (
    parse(content)
  )
}

export default BlogContent