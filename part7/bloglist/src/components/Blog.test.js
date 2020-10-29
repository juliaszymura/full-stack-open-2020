import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import Blog from "./Blog";
import blogsReducer from "../reducers/blogsReducer";
import userReducer from "../reducers/userReducer";

const reducer = combineReducers({ blogs: blogsReducer, user: userReducer });

// render function for components connected to redux store
const renderConnected = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
  useRouteMatch: () => ({ url: "blogs/1" }),
}));

jest.mock("../services/blogs", () => ({
  getAll: () => [
    {
      id: 1,
      author: "Jan Brzechwa",
      title: "Opowiadania drastyczne",
      url: "http://www.brzechwa.pl",
      likes: 1337,
      comments: ["Comment"],
      user: {
        id: "5ef888a611f9d109ba017451",
        name: "Test",
        username: "test123",
      },
    },
  ],
  update: (id, blogToUpdate) => blogToUpdate,
}));

describe("<Blog /> renders:", () => {
  let component;

  describe("For blog owner", () => {
    beforeEach(() => {
      component = renderConnected(<Blog />, {
        initialState: {
          blogs: [],
          user: {
            token: "",
            name: "Test",
            username: "test123",
          },
        },
      });
    });

    test("title and author", () => {
      expect(component.container).toHaveTextContent(
        "Opowiadania drastyczne by Jan Brzechwa"
      );
    });

    test("url, number of likes and user", () => {
      expect(component.container).toHaveTextContent("1337");
      expect(component.container).toHaveTextContent("http://www.brzechwa.pl");
      expect(component.container).toHaveTextContent("Test");
    });

    test("shows delete blog for owner", () => {
      expect(component.container).toHaveTextContent("Remove this blog");
    });
  });

  describe("For other user", () => {
    beforeEach(() => {
      component = renderConnected(<Blog />, {
        initialState: {
          blogs: [],
          user: {
            token: "",
            name: "Tset",
            username: "tset321",
          },
        },
      });
    });

    test("doesn't show delete blog for other user", () => {
      expect(component.container).not.toHaveTextContent("Remove this blog");
    });
  });
});
