import React from 'react'

const Form = () => {
    const [state, setState] = useState(true);
    const [value, setValue] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    image: null, 
  });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    
      const handleSubmit = (e) => {
        if(state){
          e.preventDefault();
          setValue((prev)=> [...prev, formData])
          console.log(value)
    
          const send = new FormData();
          send.append("title", formData.title) 
          send.append("des", formData.des) 
          send.append("image", formData.image) 
    
          const response = axios.post("http://127.0.0.1:8000", send, { headers: { "Content-Type": "multipart/form-data" }});
    
          console.log(response)
          setFormData({ title: "", des: "", image: null });
        }
      }
    
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
    
        
      //   const formDataToSend = new FormData();
      //   formDataToSend.append("title", formData.title);
      //   formDataToSend.append("des", formData.des);
      //   if (formData.image) {
      //     formDataToSend.append("image", formData.image);
      //   }
    
      //   try {
      //     const response = await axios.post("http://127.0.0.1:8000", formDataToSend, {
      //       headers: { "Content-Type": "multipart/form-data" }
      //     });
      //     console.log(response.data);
      //     setValue((prevValue) => [...prevValue, response.data]); // Store the new post
      //   } catch (err) {
      //     console.error("Error:", err);
      //   }
    
      //   setFormData({ title: "", des: "", image: null });
      // };
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

export default Form