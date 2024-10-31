import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Test App',
  keywords: ['test', 'blog', 'To-do app'],
  description: 'This is a playground for testing out different features',
}

const HomePage = () => {
  return (
    <div>
      <h1>
        HomePage
      </h1>
      <div>
        Welcome to my test app! This is a playground for testing out different features.
      </div>
    </div>
  )
}

export default HomePage