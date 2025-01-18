import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Author from "./Author";

test("renders Authors", () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "URL",
      likes: 7,
      user: { id: "userId" },
    };
  
    const user = {
      userId: "userId",
      token: "abcdefg",
      username: "username",
    };
  
    const { container } = render(<Blog key={blog.id} blog={blog} user={user} />);
    const divBlog = container.querySelector(".blog");
    expect(divBlog).toHaveTextContent("Title");
  
    expect(divBlog).toHaveTextContent("Author");
  
    const divExtra = container.querySelector(".extraInfo");
    expect(divExtra).toHaveStyle("display: none");
    expect(screen.queryByText(/url: URL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/likes: 7/i)).not.toBeInTheDocument();
  });