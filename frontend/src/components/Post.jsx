import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  return (
    <Card style={{ width: '18rem' ,height: '18rem'}}>
      <Card.Img variant="top" src={`http://127.0.0.1:8000${post.image}`} style={{ width: '10rem', height: '12rem' }}/>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.des}
        </Card.Text>
        <Link to={`edit/${post.id}/`} ><Button variant="primary">edit</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default Post