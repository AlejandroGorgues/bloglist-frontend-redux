import { createSlice} from '@reduxjs/toolkit' 
import blogsServices from '../services/blogs'
import { setNotification } from './notificationReducer.js'

const blogsSlice = createSlice({
  name: 'blog', initialState:[],
  reducers: {
    modifyLike(state, action){
        return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
        )
    },
    appendBlog(state, action){
      return state.concat(action.payload)
    },
    setBlogs(state, action){
      return action.payload
    },
    deleteBlog(state, action){
      return state.filter(anecdote =>
        anecdote.id !== action.payload.id
      )
    }
  }
})

export const { modifyLike, setBlogs, appendBlog, deleteBlog} = blogsSlice.actions
export const initializeBlogs = () => {
  return async dispatch => {
      const response = await blogsServices.getAll()
      if(response.status == 200){
        const blogs = response.data
        dispatch(setBlogs(blogs))
      }else{
        dispatch(setNotification(error.response?.data?.error, 'error', 5000))
      }
  }
}

export const createBlog = content => {
  return async dispatch => {
    const response = await blogsServices.create(content)
    if(response.status == 201){
      const blog = response.data
      dispatch(appendBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success', 5000))
    }else{
      dispatch(setNotification(error.response?.data?.error, 'error', 5000))
    }
  }
}

export const addLike = content => {
  return async dispatch => {
    const response = await blogsServices.update(content)
    if(response.status == 200){
      const blog = response.data
      dispatch(modifyLike(blog))
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} updated`, 'success', 5000))
    }else{
      dispatch(setNotification(error.response?.data?.error, 'error', 5000))
    }
  }
}

export const removeBlog = content => {
  return async dispatch => {
    const response = await blogsServices.remove(content)
    if(response.status == 204){
      dispatch(deleteBlog(content))
      dispatch(setNotification(`blog ${content.title} by ${content.author} deleted`, 'success', 5000))
    }else{
      dispatch(setNotification(error.response?.data?.error, 'error', 5000))
    }
  }
}
export default blogsSlice.reducer