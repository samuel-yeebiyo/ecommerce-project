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
    
    //check if a cookie already exists
    const uValue = Cookie.get('userID')
    const gValue = Cookie.get('guestID')

    //fetch cart based on the cookie found
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

    //if cookie is for user
    if(uValue){
      console.log("User cookie found")
      setUser(uValue);

      //load cart from database
      console.log("Loading cart")
      fetchUserCart()
    }else{
      setUser(0)
    }

    //if cookie is for guest    
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
  const addToCart = (product)=>{

    //if no cookie is found, adding to cart causes an identifier to be given to the guest
    if(user == 0 && guest == 0){
      let gID = 1234567891
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

  //update the nav bar when a user signs in, hides authentication options and adds profile link
  const toggleNav = ()=>{
    setUpdate(prev => !prev)
  }

  return (
    <Layout order={order} update={update} addItem={addItem} removeItem={removeItem}>
      <Component {...pageProps} toggleNav={toggleNav} addToCart={addToCart}/>
    </Layout>
  )
}

export default MyApp
