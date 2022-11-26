import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../App";
import style from "./post.module.sass";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";

const Posts = () => {
  const [search, setSearch] = useState("");
  const { post, setPost, loading, setLoading } = useContext(Context);
  const [form, setForm] = useState(false);
  const [select, setSelect] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getPost = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/?_limit=10&_page=${currentPage}`
    );
    setPost(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPost();
  }, [currentPage]);

  if (loading) {
    return <h1>Загрузка постов...</h1>;
  }

  const removePost = (id) => {
    const result = post.filter((item) => item.id !== id);
    setPost(result);
  };

  const filteredById = search
    ? post.filter((item) => item.id === +search)
    : post.map((item) => item);

  const sortById =
    select === "По убыванию"
      ? filteredById.sort((a, b) => b.id - a.id)
      : select === "По возрастанию"
      ? filteredById.sort((a, b) => a.id - b.id)
      : filteredById.map((item) => item);

  let newPost = { userId: 1, id: post.length + 1, title: title, body: body };

  const handleClick = () => {
    localStorage.setItem(newPost, JSON.stringify(newPost));
    newPost = JSON.parse(localStorage.getItem(newPost));
    setForm(false);
    setPost([...post, newPost]);
  };

  return (
    <div className={style.post_body}>
      <div className={style.search}>
        <Search
          select={select}
          setSelect={setSelect}
          search={search}
          setSearch={setSearch}
        />
        <div className={style.modal}>
          <div>
            <button className={style.addPost} onClick={() => setForm(!form)}>
              Добавить пост
            </button>
          </div>
          <div className={style.form_wrapper}>
            {form && (
              <div className={style.form_body}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                  />
                  <button onClick={handleClick}>Добавить</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <h1>Посты</h1>
      {sortById.map((el, index) => (
        <div key={index} className={style.post}>
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
      ))}
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Posts;
