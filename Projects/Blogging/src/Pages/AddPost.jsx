import React from 'react'
import  Container from '../Components/container/Container'
import PostForm from '../Components/PostForm/PostForm'

function AddPost() {
  return (
    <div className='my-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost