import '../styles/globals.css'
import Layout from '../layouts/layout'
import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

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

  const [blocking, setBlocking] = useState(false)


  useEffect(()=>{
    
    //updating the cart when an item is added or removed
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
        }).then(async res => await res.json()).then(data=>{
          //allow other operations once done
          setBlocking(false)
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
        }).then(async res => await res.json()).then(data=>{
          //allow other operations once done
          setBlocking(false)
        })
      }
    }

    updateOrder();

  }, [order])


  //fetching respective carts on arrival
  useEffect(()=>{
    
    //check if a cookie already exists
    const uValue = Cookie.get('userID')
    const gValue = Cookie.get('guestID')

    //fetch cart based on the cookie found
    const fetchGuestCart = async(id) =>{
      await fetch(`http://localhost:8000/guest/${id}/cart/`)
      .then(async res => await res.json()).then(data =>{
        if(data.message != "No cart"){
          console.log("Cart found!")
          setOrder(data)
        }else{
          console.log("No cart")
        }
      })
    }

    const fetchUserCart = async (id) =>{
      await fetch(`http://localhost:8000/user/${id}/cart/`)
      .then(async res => await res.json()).then(data =>{
        if(data.message != "No cart"){
          console.log("Cart found!")
          setOrder(data)
        }else{
          console.log("No cart")
        }
        
      })
    }

    //if cookie is for user
    if(uValue){
      console.log("User cookie found")
      setUser(uValue);

      //load cart from database
      console.log("Loading cart")
      fetchUserCart(uValue)
    }else{
      setUser(0)
    }

    //if cookie is for guest    
    if(gValue){
      console.log("Guest cookie found")
      setGuest(gValue)

      //load cart from database
      console.log("Loading cart")
      fetchGuestCart(gValue)
    }else{
      setGuest(0)
    }

  },[])
  
  


  //This should be the method to put items in the cart
  const addToCart = (product)=>{

    //block other operations
    setBlocking(true)


    //if no cookie is found, adding to cart causes an identifier to be given to the guest
    if(user == 0 && guest == 0){
      let gID = uuidv4() //change to random uuid
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
      setOrder(tempOrder) //triggers order update and useEffect to send current cart to server
    
    }//if it is not empty, check if item exists
    else{
      
      let index = order.items.findIndex(element => element.itemId == product.productId)
      console.log(index)
      
      //if item already exists, add quantity and price
      if(index != -1){
        
        console.log("Found")
        let tempOrder = {...order}
        tempOrder.items[index].quantity+=1
        tempOrder.subtotal += product.price
        setOrder(tempOrder) //triggers order update and useEffect to send current cart to server
      
      }else{
        
        //if item is new, add entry with the quantity as 1
        let tempOrder = {...order}
        tempOrder.items.push({
          itemId: product.productId,
          name: product.name,
          quantity: 1,
          price: product.price
        })
        tempOrder.subtotal += product.price
        setOrder(tempOrder) //triggers order update and useEffect to send current cart to server
      }
    }
  }


  const addItem = (id) =>{

    //block other operations
    setBlocking(true)
        
    console.log("Adding")
    let tempOrder = {...order}

    tempOrder.items.map((item)=>{
      if(item.itemId == id){
        item.quantity+=1;
        tempOrder.subtotal+=item.price
      }
    })

    setOrder(tempOrder) //triggers order update and useEffect to send current cart to server
    
  }

  const removeItem = (id) =>{

    //block other operations
    setBlocking(true)
        
    console.log("Removing")
    let tempOrder = {...order}

    tempOrder.items.map((item, idx)=>{
      if(item.itemId == id){
        item.quantity-=1;
        tempOrder.subtotal-=item.price

        if(item.quantity == 0){
          tempOrder.items.splice(idx,1)
        }

        return
      }
    })

    setOrder(tempOrder) //triggers order update and useEffect to send current cart to server
    
  }

  const clearCart = ()=>{
    setOrder({
      items:[],
      subtotal:0
    })
  }

  //update the nav bar when a user signs in, hides authentication options and adds profile link
  const toggleNav = ()=>{
    setUpdate(prev => !prev)
  }

  return (
    <Layout toggleNav={toggleNav} order={order} update={update} addItem={addItem} removeItem={removeItem} blocking={blocking}>
      <Component {...pageProps} toggleNav={toggleNav} addToCart={addToCart} blocking={blocking} order={order} user={user} guest={guest} clear={clearCart}/>
    </Layout>
  )
}

export default MyApp
