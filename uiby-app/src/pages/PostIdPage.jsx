import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PosrServise from "../API/PostService";
import { Loader } from "../components/UI/loader/Loader";

export const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PosrServise.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PosrServise.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div className="post__page">
      <h1>Вы открыли пост №{params.id}</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <div>Произошла ошибка: {error}</div>
          ) : (
            <div>
              {post.id}. {post.title}
            </div>
          )}
        </>
      )}
      <h2>Комментарии</h2>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
