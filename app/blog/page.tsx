import React from 'react'
import prisma from '../../prisma/db'


const page = async () => {
    const posts = await prisma.post.findMany()
  return (
    <div>
      <h1>
        Blog
      </h1>
      <div>
        This page will show all of the blog posts. The posts can be filtered by category, newest, and oldest.
      </div>
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>


    </div>
  )
}

export default page
