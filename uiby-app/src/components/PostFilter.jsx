import React from "react";
import { MySelect } from "./UI/select/MySelect";
import { MyInput } from "./UI/input/MyInput";

export const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      {/* Поле ввода для поиска постов */}
      <MyInput
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        value={filter.query}
        placeholder="Поиск..."
      />
      {/* Выпадающий список для выбора сортировки */}
      <MySelect
        onChange={(setSelectedSort) =>
          setFilter({ ...filter, sort: setSelectedSort })
        }
        value={filter.sort}
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ]}
      />
    </div>
  );
};
