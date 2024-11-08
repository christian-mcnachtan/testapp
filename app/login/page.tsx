"use client"

import { Authenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';


export default function App() {
    const [currentUser, setCurrentUser] = useState<FetchUserAttributesOutput|undefined>();

    

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
  }, []);
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {currentUser?.email}</h1>
          <button onClick={signOut}>Sign out</button>
          
        </main>
      )}
    </Authenticator>
  );
};