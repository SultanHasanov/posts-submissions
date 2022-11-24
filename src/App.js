import "./App.css";
import { useState } from 'react'
import Posts from "./components/Post/Posts";
import { Routes, Route } from "react-router-dom";
import Comments from "./components/Comments/Comments";
import { createContext } from "react";

export const Context = createContext();

function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Context.Provider value={{post, loading, setPost, setLoading}}>
        <Routes>
          <Route path="/" element={<Posts />}></Route>
          <Route path="/posts/:id" element={<Comments />}></Route>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
