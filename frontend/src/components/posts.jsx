import React, { useEffect, useState } from 'react'
import axios from "axios"
import Post from './Post'

const Posts = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
      axios.get("http://127.0.0.1:8000/")
      .then((value)=> (setData(value.data)))
      .catch((e)=> (e.error))
    },[])

    console.log(data)
    
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
    </div>
  )
}

export default Posts