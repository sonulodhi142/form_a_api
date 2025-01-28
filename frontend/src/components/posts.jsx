import React, { useState } from 'react'

const Posts = () => {
    const [data, SetData] = useState()

    const handleChange = () => {
        const {name, value} = e.target;
        setvalues({...data, [name]: value})
    }
  return (
    <div>Posts
        <h1>Posts</h1>
    </div>
  )
}

export default Posts