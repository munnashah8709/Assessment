import React from 'react'
//import Register from '../components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostForm from '../Component/PostForm';
import HomePage from '../Component/HomePage';
import PostList from '../Component/PostList';

const Routs = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/PostForm' element={<PostForm />} />
          <Route path='/CommentList' element={<PostList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routs