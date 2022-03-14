import '../styles/globals.css'
import Layout from '../components/layout'
import {useState, useEffect} from 'react'

import Cookie from 'cookie-cutter'

function MyApp({ Component, pageProps }) {

  //This should be the cart state that should be saved
  const [order, setOrder] = useState({
    items:[],
    subtotal:0
  })
  const [update, setUpdate] = useState(false)
  const [user, setUser] = useState(0)
  const [guest, setGuest] = useState(0)


  useEffect(()=>{
    
    const updateOrder = async ()=>{
      if(user != 0){
        console.log("Trying to update user cart")

        await fetch(`http://localhost:8000/user/${user}/cart/update`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          mode:'cors',
          body:JSON.stringify(order)
        })
      }else if(guest != 0){
        console.log("Trying to update guest cart")

        await fetch(`http://localhost:8000/guest/${guest}/cart/update`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          mode:'cors',
          body:JSON.stringify(order)
        })
      }
    }

    updateOrder();

  }, [order])


  useEffect(()=>{
    
    const uValue = Cookie.get('userID')
    const gValue = Cookie.get('guestID')

    const fetchGuestCart = async() =>{
      await fetch(`http://localhost:8000/guest/${gValue}/cart/`)
      .then(async res => await res.json()).then(data =>{
        console.log("Cart found!")
        setOrder(data)
      })
    }

    const fetchUserCart = async () =>{
      await fetch(`http://localhost:8000/user/${uValue}/cart/`).then(async res => await res.json()).then(data =>{
        console.log("Cart found!")
        setOrder(data)
      })
    }



    if(uValue){
      console.log("User cookie found")
      setUser(uValue);

      //load cart from database
      console.log("Loading cart")
      fetchUserCart()
    }else{
      setUser(0)
    }

    
    if(gValue){
      console.log("Guest cookie found")
      setGuest(gValue)

      //load cart from database
      console.log("Loading cart")
      fetchGuestCart()
    }else{
      setGuest(0)
    }

  },[])
  
  


  //This should be the method to put items in the cart
  //Should also save it online to the user's cart
  const addToCart = (product)=>{

    if(user == 0 && guest == 0){
      let gID = 123456789
      Cookie.set("guestID", gID)
      setGuest(gID)
    }


    //if it is empty
    if(order.items.length == 0){

      let tempOrder = {...order}
      tempOrder.items.push({
        itemId: product.productId,
        name: product.name,
        quantity: 1,
        price: product.price
      })
      tempOrder.subtotal += product.price
      setOrder(tempOrder)
    
    }//if it is not empty, check if item exists
    else{
      
      let index = order.items.findIndex(element => element.itemId == product.productId)
      console.log(index)
      
      if(index != -1){
        
        console.log("Found")
        let tempOrder = {...order}
        tempOrder.items[index].quantity+=1
        tempOrder.subtotal += product.price
        setOrder(tempOrder)
      
      }else{
      
        let tempOrder = {...order}
        tempOrder.items.push({
          itemId: product.productId,
          name: product.name,
          quantity: 1,
          price: product.price
        })
        tempOrder.subtotal += product.price
        setOrder(tempOrder)
      }
    }
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
