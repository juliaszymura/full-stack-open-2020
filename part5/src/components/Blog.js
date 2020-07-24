import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, onLikeClick, onDeleteClick, isOwner }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    borderColor: "#e693cb",
    marginBottom: 5,
  };

  const toggleDetails = () => setShowFullInfo(!showFullInfo);

  const removeButton = () => (
    <button onClick={onDeleteClick}>Remove this blog</button>
  );

  const showDetails = (blog) => {
    return (
      <div className={"blog-details"} style={blogStyle}>
        <i>{blog.title}</i> by {blog.author}
        <button onClick={toggleDetails}>Hide details</button>
        {`\n${blog.url}\nlikes: ${blog.likes} `}
        <button onClick={onLikeClick}>Like</button>
        {`\n${blog.user.name}\n`}
        {isOwner && removeButton()}
      </div>
    );
  };

  const showTitleWithAuthor = (blog) => {
    return (
      <div style={blogStyle}>
        <i>{blog.title}</i> by {blog.author}
        <button onClick={toggleDetails}>View details</button>
      </div>
    );
  };

  return (
    <>{showFullInfo === true ? showDetails(blog) : showTitleWithAuthor(blog)}</>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default Blog;
