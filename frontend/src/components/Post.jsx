import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Post = ({post}) => {
  return (
    <Card style={{ width: '18rem' ,height: '18rem'}}>
      <Card.Img variant="top" src={`http://127.0.0.1:8000${post.image}`} style={{ width: '10rem', height: '12rem' }}/>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.des}
        </Card.Text>
        <Card.Text>
          {post.id}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default Post