import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.content);

  const styleNotificationSet = {
    border: "solid",
    color: notification ? "#b795f3" : "rgba(0,0,0,0)",
    padding: notification ? 10 : 0,
    borderWidth: 1,
    marginBottom: 10,
  };

  const styleNotificationCleared = {
    color: "rgba(0,0,0,0)",
  };

  const style = notification ? styleNotificationSet : styleNotificationCleared;

  return <div style={style}>{notification}</div>;
};

export default Notification;
