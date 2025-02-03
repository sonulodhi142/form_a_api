import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Posts = () => {
  
  const [data, setData] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000")
      .then((response) => setData(response.data))
      .catch((e) => console.error("Error fetching data:", e));
  }, []);

  

  return (
    <div>
      <h1>Posts</h1>
      <Link to={'create/'} ><Button variant="primary">Create Post</Button></Link>
      <div style={{ display: "flex", flexWrap: 'wrap' }}>
        {data.map((post, id) => (
          <Post post={post} key={id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
