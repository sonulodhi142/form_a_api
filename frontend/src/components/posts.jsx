import React, { useEffect, useState } from 'react'
import axios from "axios"
import Post from './Post'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Posts = () => {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState([
      {
        'title': '',
        'des': '',
        'image': '',
      }
    ])

    useEffect(()=> {
      axios.get("http://127.0.0.1:8000/")
      .then((value)=> (setData(value.data)))
      .catch((e)=> (e.error))
    },[])

    console.log(data)

    const handleChange = (e) => {
      const {name, value}= e.target;
      setFormData({...formData, [name]: value})
    }
    
    const handleSubmit = (e) =>{
      e.preventDefault()
      console.log(formData)
    }
    
  return (
    <div>
        <h1>Posts</h1>
        <div style={{display:'flex'}}>
        {
          data.map((post,id)=>{
            return <Post post={post} key={id}/>
          })
        }
        </div>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Titel:</Form.Label>
          <Form.Control type="text" placeholder="Title" name='title' value={formData.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" placeholder="Description" name='des' value={formData.des} onChange={handleChange}  />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload an Image:</Form.Label>
          <Form.Control type="file" name='image' value={formData.image} onChange={handleChange}  />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
      
    </Form>
    </div>
  )
}

export default Posts