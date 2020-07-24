import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    author: "Jan Brzechwa",
    title: "Opowiadania drastyczne",
    url: "http://www.brzechwa.pl",
    likes: 1337,
    user: { id: "5ef888a611f9d109ba017451", name: "Test", username: "test123" },
  };
  const mockLikeHandler = jest.fn();
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        onLikeClick={mockLikeHandler}
        onDeleteClick={() => {}}
        isOwner={true}
      />
    );
  });

  describe("by default", () => {
    test("renders title and author", () => {
      expect(component.container).toHaveTextContent(
        "Opowiadania drastyczne by Jan Brzechwa"
      );
    });
    test("doesn't render url, number of likes or user", () => {
      expect(component.container).not.toHaveTextContent("1337");
      expect(component.container).not.toHaveTextContent(
        "http://www.brzechwa.pl"
      );
      expect(component.container).not.toHaveTextContent("Test");
    });
  });
  describe("details button has been clicked", () => {
    test("renders url and number of likes", () => {
      const detailsButton = component.getByText("View details");
      fireEvent.click(detailsButton);

      expect(component.container).toHaveTextContent("1337");
      expect(component.container).toHaveTextContent("http://www.brzechwa.pl");
    });

    test("like button clicked twice calls like button event handler twice", () => {
      const detailsButton = component.getByText("View details");
      fireEvent.click(detailsButton);

      const likeButton = component.getByText("Like");
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);

      expect(mockLikeHandler.mock.calls).toHaveLength(2);
    });
  });
});
