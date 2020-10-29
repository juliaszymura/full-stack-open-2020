import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import BlogForm from "./BlogForm";

const mockStore = configureMockStore([thunk]);

jest.mock("../services/blogs", () => ({
  create: (blogToUpdate) => blogToUpdate,
}));

describe("Add blog form", () => {
  const newBlog = {
    author: "Jan Brzechwa",
    title: "Opowiadania drastyczne",
    url: "https://www.brzechwa.pl",
  };

  test("clicking add new blog button dispatches addBlog action", async () => {
    const store = mockStore({ blogs: [] });
    const blogFormRef = { current: { toggleVisibility: () => {} } };

    const component = render(
      <Provider store={store}>
        <BlogForm blogFormRef={blogFormRef} />
      </Provider>
    );

    const author = component.container.querySelector("input[name='author']");
    const title = component.container.querySelector("input[name='title']");
    const url = component.container.querySelector("input[name='url']");

    fireEvent.change(author, { target: { value: newBlog.author } });
    fireEvent.change(title, { target: { value: newBlog.title } });
    fireEvent.change(url, { target: { value: newBlog.url } });

    fireEvent.submit(component.container.querySelector("form"));

    const addAction = { type: "blogs/added", blog: newBlog };

    // waiting for async blogService mock
    await new Promise((r) => setTimeout(r));
    expect(store.getActions()).toContainEqual(addAction);
  });
});
