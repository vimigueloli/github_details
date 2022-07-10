import Header from '../components/Header'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <div className='w-sreen h-screen bg-zinc-100 overflow-y-auto relative'>
      <Toaster position="top-right" />
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
