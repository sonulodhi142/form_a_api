import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Forms = () => {
    const [value, setValue] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    image: null, 
  });
  const navigate = useNavigate()
  const {id} = useParams();

  useEffect( async () => {
    await axios.get("http://127.0.0.1:8000")
    .then((res)=> setValue(res.data))
    .catch((error)=> error)
    console.log(value)
    },[])


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
            headers: { "Content-Type": "multipart/form-data" }
          });
        } catch (err) {
          console.error("Error:", err);
        }
    
        setFormData({ title: "", des: "", image: null });
        navigate('/')
      };
  return (
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
  )
}

export default Forms