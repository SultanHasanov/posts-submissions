import axios from 'axios';
import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Context } from '../../App';
import style from "./comments.module.sass";



const Comments = () => {
    const params = useParams();
     const [comment, setComment] = useState([])
     const { loading, setLoading } = useContext(Context)

    const getComments = async () => {
        setLoading(true)
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
        );
        setComment(response.data)
        setLoading(false)
    }

    useEffect(() => {
        getComments()
    }, [])
    
    if (loading) {
        return <h1>Загрузка комментариев...</h1>
    }

    return (
      <div>
        <Link to="/">
          <button>НАЗАД</button>
        </Link>
        <div>
          <h1>Вы открыли страницу поста c ID = {params.id}</h1>
          {comment.map((item) => {
            return (
              <div className={style.comment_body}>
                <div className={style.comment_text}>
                  <b>User: </b>
                  {item.email}
                </div>
                <div>
                  <b>Comments: </b>
                  {item.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default Comments;