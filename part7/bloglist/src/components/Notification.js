import { Alert } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const severity = notification.isError ? "error" : "success";

  return <Alert severity={severity}>{notification.content}</Alert>;
};

export default Notification;
