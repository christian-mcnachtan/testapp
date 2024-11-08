'use client'

import { usePathname} from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import useCurrentUser from '@/hooks/useCurrentUser'

const Navbar = () => {
  const currentUser = useCurrentUser();
    
    const pathname = usePathname();
    
  return (
    <div>
        <div id='navbar'>
            <Link href="/" className={ `${pathname === '/' ? 'bg-white text-black' : ''}` }>Home</Link>
            <Link href="/blog" className={ `${pathname === '/blog' ? 'bg-white text-black' : ''}`}>Blog</Link>
            <Link href="/about" className={ `${pathname === '/about' ? 'bg-white text-black' : ''}` }>About</Link>
            <Link href="/contact" className={ `${pathname === '/contact' ? 'bg-white text-black' : ''}` }>Contact</Link>
            { currentUser && <Link href="/dashboard" className={ `${pathname === '/dashboard' ? 'bg-white text-black' : ''}` }>Dashboard</Link>}
            <Link href="/login" className={ `${pathname === '/login' ? 'bg-white text-black' : ''}` }>Login</Link>
        </div>
      
    </div>
  )
}

export default Navbar
