import '@/styles/global.css';
import Navbar from '@/components/Navbar';

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

