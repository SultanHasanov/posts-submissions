import React from 'react';
import style from "./search.module.sass";


const Search = ({search, setSearch}) => {




    return (
      <>
        <input
          type="text"
          placeholder="Поиск по ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select>
          <option hidden value="">
            Сортировка по ID
          </option>
          <option value="">По убыванию</option>
          <option value="">По возрастанию</option>
        </select>
      </>
    );
};

export default Search;