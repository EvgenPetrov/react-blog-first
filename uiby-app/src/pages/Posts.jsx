import React, { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import { PostList } from "../components/PostList";
import { PostForm } from "../components/PostForm";
import { PostFilter } from "../components/PostFilter";
import { MyModal } from "../components/UI/MyModal/MyModal";
import { MyButton } from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PosrServise from "../API/PostService";
import { Loader } from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { Pagination } from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import { MySelect } from "../components/UI/select/MySelect";

export const Posts = () => {
  // Состояние для хранения списка постов
  const [posts, setPosts] = useState([]);

  // Состояния для сортировки и поиска
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  // Получение данных о постах из API при первом рендеринге компонента
  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PosrServise.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  // Функция для создания нового поста
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Функция для удаления поста
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ marginTop: 30 }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit.toString()}
        onChange={(value) => setLimit(Number(value))}
        defaultValue={`Кол-во элементов на странице`}
        options={[
          { value: "5", name: "5" },
          { value: "10", name: "10" },
          { value: "25", name: "25" },
          { value: "-1", name: "Показать все" },
        ]}
      />

      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты про JS"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }} />
      {isPostLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
};
