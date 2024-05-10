import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostForm from "../pages/PostForm";
import PostList from "../pages/PostList";
import NavBar from "../components/BlogNav";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div className="app">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create-blog" element={<PostForm />} />
            <Route path="/edit-blog" element={<PostList />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
