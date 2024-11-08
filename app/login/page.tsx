"use client"

import useCurrentUser from '@/hooks/useCurrentUser';
import { Authenticator } from '@aws-amplify/ui-react';



export default function App() {
    
    const currentUser = useCurrentUser();
    

    
  return (
    <Authenticator>
      {({ signOut, user }) => {
        
        return (
        <main>
          <h1>Hello {currentUser?.email}</h1>
          <button onClick={signOut}>Sign out</button>
          
        </main>
      )}}
    </Authenticator>
  );
};