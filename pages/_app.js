import '../styles/globals.css'
import Layout from '../components/layout'
import {useState} from 'react'

function MyApp({ Component, pageProps }) {

  //This should be the cart state that should be saved
  const [counter, setCounter] = useState(0)

  //This should be the method to put items in the cart
  //Should also save it online to the user's cart
  const increment = ()=>{
    setCounter(prev => prev+=1)
  }

  return (
    <Layout counter={counter} >
      <Component {...pageProps} increment={increment}/>
    </Layout>
  )
}

export default MyApp
