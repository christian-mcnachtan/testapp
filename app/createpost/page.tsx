"use client"
import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react'


const page = () => {
    const currentUser = useCurrentUser();
  
    if (!currentUser) {
        return null
    };
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default page

