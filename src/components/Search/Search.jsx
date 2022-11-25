import React, { useContext } from "react";
import style from "./search.module.sass";

const Search = ({ search, setSearch, select, setSelect }) => {

  const handleSelect = (e) => {
    setSelect(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <input
        type="number"
        placeholder="Поиск по ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={select} onChange={handleSelect}>
        <option hidden value="">
          Сортировка по ID
        </option>
        <option value="По убыванию">
          По убыванию
        </option>
        <option value="По возрастанию">По возрастанию</option>
      </select>
    </>
  );
};

export default Search;
