import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Posts = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    image: null, 
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000")
      .then((response) => setData(response.data))
      .catch((e) => console.error("Error fetching data:", e));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("des", formData.des);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setValue((prevValue) => [...prevValue, response.data]); // Store the new post
    } catch (err) {
      console.error("Error:", err);
    }

    setFormData({ title: "", des: "", image: null });
  };

  return (
    <div>
      {value.map((d, index) => (
        <div key={index}>
          <h1>{d.title}</h1>
          <h2>{d.des}</h2>
        </div>
      ))}

      <h1>Posts</h1>
      <div style={{ display: "flex", flexWrap: 'wrap' }}>
        {data.map((post, id) => (
          <Post post={post} key={id} />
        ))}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            name="des"
            value={formData.des}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload an Image:</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Posts;
