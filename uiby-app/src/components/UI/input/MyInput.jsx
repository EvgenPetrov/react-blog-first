// MyInput.jsx
import React from "react";
import classes from "./MyInput.module.css";

// Компонент MyInput для ввода текста
export const MyInput = (props) => {
  return <input className={classes.myInput} {...props} type="text" />;
};
