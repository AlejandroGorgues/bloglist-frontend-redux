import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Home from "./Home.jsx";

const Authors = () => {
  const authors = useSelector((state) => state.authors)
  return (
    <div>
      <Home />
      <div data-testid="authors-list">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th><strong>blogs created</strong></th>
            </tr>
          </thead>
          <tbody>
            {authors !== null ? ([...authors]
              .sort((ob1, ob2) => ob2.likes - ob1.likes)
              .map((author) => <tr key={author.id}>
                  <td><Link to={`/users/${author.id}`}>{author.username}</Link></td>
                  <td>{author.blogs.length}</td>
                </tr>)
            ):(
              <p>No data</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Authors;
