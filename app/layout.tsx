"use client";
import '@/styles/global.css';
import Navbar from '@/components/Navbar';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);


const MainLayout:React.FC<React.PropsWithChildren> = ({children}) => {
  
  return (
   <html>
    <body>
      <Navbar />
      <main>
        {children}
      </main>
    </body>
   </html>
  )
}

export default MainLayout

