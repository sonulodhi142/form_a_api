import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Forms = () => {
    const [state, setState] = useState(false);
    const [value, setValue] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    image: null, 
  });
  const navigate = useNavigate()
  const {id} = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/${id}/`)
      .then((response) => setFormData(response.data))
      .catch((e) => console.error("Error fetching data:", e));
      setState(true)
  }, [id]);
   

  
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
          let response;
          if (state) {
            response = await axios.put(`http://127.0.0.1:8000/${id}/`, formDataToSend, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } else {
            response = await axios.post("http://127.0.0.1:8000", formDataToSend, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
        }
        catch{
          console.log("error")
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