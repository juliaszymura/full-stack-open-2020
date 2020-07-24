import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("Add blog form", () => {
  const newBlog = {
    author: "Jan Brzechwa",
    title: "Opowiadania drastyczne",
    url: "https://www.brzechwa.pl",
  };

  test("clicking add new blog button calls add new blog event handler with right details", async () => {
    const addBlogMock = jest.fn();

    const component = render(
      <BlogForm onSubmitHandle={addBlogMock} blogFormRef={{}} />
    );

    const author = component.container.querySelector("input[name='author']");
    const title = component.container.querySelector("input[name='title']");
    const url = component.container.querySelector("input[name='url']");

    fireEvent.change(author, { target: { value: newBlog.author } });
    fireEvent.change(title, { target: { value: newBlog.title } });
    fireEvent.change(url, { target: { value: newBlog.url } });

    fireEvent.submit(component.container.querySelector("form"));

    expect(addBlogMock).toBeCalled();
    const [mockAuthor, mockTitle, mockUrl] = addBlogMock.mock.calls[3];
    expect(mockAuthor).toBe(newBlog.author);
    expect(mockTitle).toBe(newBlog.title);
    expect(mockUrl).toBe(newBlog.url);
  });
});
