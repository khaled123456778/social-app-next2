 
 import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { PropsWithChildren } from 'react';
import ReduxProvider from './components/ReduxProvider/ReduxProvider';
import toast, { Toaster } from 'react-hot-toast';
import { CssBaseline } from '@mui/material';



const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

 export default function RootLayout({ children }: PropsWithChildren) {
    
   return (
    <html lang="en" className={roboto.variable}>
       <body>
          <AppRouterCacheProvider>
           <ThemeProvider theme={theme}>
           <ReduxProvider >
            <CssBaseline/> 
            <Toaster/>
             <Navbar/>
              {children}
              <Footer/>
           </ReduxProvider>
           </ThemeProvider>
          </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
