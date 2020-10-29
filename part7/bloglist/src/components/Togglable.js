import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginLeft: "1rem",
    marginRight: "1rem",
  },
});

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const style = useStyles();

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div className={style.root}>
      <div className={style.inl}>
        <div className={"shown"} style={showWhenVisible}>
          {props.children}
          <Button
            className={style.button}
            variant="outlined"
            color="secondary"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className={"hidden"} style={hideWhenVisible}>
        <Button variant="outlined" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
