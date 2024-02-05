// MyButton.jsx
import classes from "./MyButton.module.css";

// Компонент MyButton для отображения кнопки
export const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
