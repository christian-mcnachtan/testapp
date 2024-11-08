"use client"

import { Authenticator } from '@aws-amplify/ui-react';
import { AuthUser, fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';


export default function App() {
    const [currentUser, setCurrentUser] = useState<FetchUserAttributesOutput|undefined>();
    const [userSession, setUserSession] = useState<AuthUser>();
    

    async function currentAuthenticatedUser() {
      try {
        const  result   = await fetchUserAttributes();
        setCurrentUser(result);
      } catch (err) {
        console.log(err);
      }
    }
  useEffect(() => {
    currentAuthenticatedUser();
  }, [userSession]);
  return (
    <Authenticator>
      {({ signOut, user }) => {
        setUserSession(user);
        return (
        <main>
          <h1>Hello {currentUser?.email}</h1>
          <button onClick={signOut}>Sign out</button>
          
        </main>
      )}}
    </Authenticator>
  );
};