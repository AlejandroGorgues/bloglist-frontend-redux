import { useSelector } from 'react-redux'
import {  useMatch} from 'react-router-dom'
import Home from './Home'
const Author = () =>{
  const authors = useSelector((state) => state.authors)
  const match = useMatch('/users/:id')
  const author = match
    ? authors.find(author => author.id === match.params.id)
    : null
  return(
      <div>
        <Home />
        <h2>{author.username}</h2>
        <p><strong>added blogs</strong></p>
          <ul>
            {[...author.blogs]
              .map((blog) => <li key={blog.id}>{blog.title}</li>)
            }
          </ul>
      </div>
  )
}
export default Author