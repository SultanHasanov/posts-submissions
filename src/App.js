import "./App.css";
import { useState } from 'react'
import Posts from "./components/Post/Posts";
import { Routes, Route } from "react-router-dom";
import Comments from "./components/Comment/Comments";
import { createContext } from "react";
import NotFound from "./pages/NotFound";

export const Context = createContext();

function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = {
    post,
    loading,
    setPost,
    setLoading,
  };

  return (
    <div className="App">
      <Context.Provider value={value}>
        <Routes>
          <Route path="/" element={<Posts />}></Route>
          <Route path="/posts/:id" element={<Comments />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
