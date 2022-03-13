import '../styles/globals.css'
import Layout from '../components/layout'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {

  //This should be the cart state that should be saved
  const [order, setOrder] = useState({
    items:[],
    subtotal:0
  })
  const [update, setUpdate] = useState(false)

  useEffect(()=>{

    const updateOrder = ()=>{
      
    }

  }, [order])

  //This should be the method to put items in the cart
  //Should also save it online to the user's cart
  const addToCart = (product)=>{
    //if it is empty
    if(order.items.length == 0){
      setOrder(prev => {
        prev.items.push({
          itemId: product.productId,
          name: product.name,
          quantity: 1,
          price: product.price
        })
        prev.subtotal += product.price

        return prev
      })
    }//if it is not empty, check if item exists
    else{
      let index = order.items.findIndex(element => element.itemId == product.productId)
      console.log(index)
      if(index != -1){
        console.log("Found")
        setOrder(prev => {
          prev.items[index].quantity+=1
          prev.subtotal += product.price
          return prev
        })
      }else{
        setOrder(prev => {
          prev.items.push({
            itemId: product.productId,
            name: product.name,
            quantity: 1,
            price: product.price
          })
          prev.subtotal += product.price
  
          return prev
        })
      }
    }

    console.log(order)
  }



  const toggleNav = ()=>{
    setUpdate(prev => !prev)
  }

  return (
    <Layout order={order} update={update}>
      <Component {...pageProps} toggleNav={toggleNav} addToCart={addToCart}/>
    </Layout>
  )
}

export default MyApp
