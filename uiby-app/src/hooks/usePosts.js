import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  // Мемоизированный массив для отсортированных постов
  const sortedPosts = useMemo(() => {
    console.log("Отработала функция СОРТИРОВКИ ПОСТОВ");
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  // Мемоизированный массив для отсортированных и отфильтрованных постов
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
