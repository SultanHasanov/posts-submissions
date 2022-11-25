import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../App";
import style from "./post.module.sass";
import Search from "../Search/Search";

const Posts = () => {
  const [search, setSearch] = useState('');
  const { post, setPost, loading, setLoading } = useContext(Context);
  // const [sortDesc, setSortDesc] = useState(false)
  const [select, setSelect] = useState("")
  const getPost = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/?_limit=10"
    );
    setPost(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (loading) {
    return <h1>Загрузка постов...</h1>;
  }

  const removePost = (id) => {
    const result = post.filter((item) => item.id !== id);
    setPost(result);
  };

  const filteredById = search ? post.filter((item) => item.id === +search) : post.map((item) => item)

  const sortById =
    select === "По убыванию"
      ? filteredById.sort((a, b) => b.id - a.id)
      : select === "По возрастанию"
      ? filteredById.sort((a, b) => a.id - b.id)
      : post.map((item) => item);

  return (
    <div className={style.post_body}>
      <div className={style.search}>
        <Search  select={select} setSelect={setSelect} search={search} setSearch={setSearch} />
      </div>
      <h1>Посты</h1>
      {sortById.map(
        (el) =>
          (
            <div className={style.post}>
              <div className={style.text}>
                <span>
                  <b>
                    {el.id}. {el.title}
                  </b>
                </span>
                <div>{el.body}</div>
              </div>
              <div className={style.button}>
                <Link to={`/posts/${el.id}`}>
                  <button className={style.btn_open_post}>Open</button>
                </Link>
                <button
                  className={style.btn_delete_post}
                  onClick={() => removePost(el.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) 
      )}
    </div>
  );
};

export default Posts;
