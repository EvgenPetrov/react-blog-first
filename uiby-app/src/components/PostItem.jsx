//PostItem
import React from "react";
import { MyButton } from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

// Компонент PostItem для отображения одного поста
export const PostItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        {/* Вывод номера и названия поста */}
        <strong>
          {props.post.id} {props.post.title}
        </strong>
        {/* Вывод описания поста */}
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};
