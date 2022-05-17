import 'styles/globals.css'
import Layout from '@/layouts/layout'
import {useState, useEffect, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import NProgress from 'nprogress'
import Cookie from 'cookie-cutter'
import Router from 'next/router'
import Head from 'next/head'

import { userContext } from '@/context/store'
import { mutate } from 'swr'
import {useUser} from '@/hooks/swrHooks'

import PostListing from '@/components/modals/postListing'

//Routing progress bar
Router.events.on('routeChangeStart', ()=> NProgress.start())
Router.events.on('routeChangeComplete', ()=> NProgress.done())
Router.events.on('routeChangeError', ()=> NProgress.done())

function MyApp({ Component, pageProps }) {

  const token = useRef(null)
  const {user_p, error, mutate, isLoading} = useUser()


  //This should be the cart state that should be saved
  const [order, setOrder] = useState({
    items:[],
    subtotal:0
  })
  const [update, setUpdate] = useState(false)

  const [user, setUser] = useState("")
  const [profile,setProfile] = useState({})
  const [guest, setGuest] = useState("")
  
  const [userShop, setUserShop] = useState(false)
  const [shop, setShop] = useState('')
  const [listings, setListings] =useState([])
  
  const [blocking, setBlocking] = useState(false)
  const [loading,setLoading] = useState(false)


  const fetchUserCart = async (token) =>{
    await fetch(`http://localhost:8000/user/cart/`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'authorization': `Bearer ${token}`
      }
    }).then(async res => await res.json()).then(data =>{
      if(data.message != "No cart"){
        console.log("Cart found!")
        setOrder(data)
      }else{
        console.log("No cart")
      }
      
    })
  }



  //fetching respective carts on arrival
  useEffect(()=>{
    
    //check if a cookie already exists
    const userAccess = Cookie.get('accessToken')

    const guestAccess = Cookie.get('guestID')

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

  
    //if cookie is for user
    if(userAccess){
      console.log("User cookie found")
      // setUser(uValue);

      //load cart from database
      console.log("Loading cart")
      fetchUserCart(userAccess)

    }else{
      setUser("")
    }

    //if cookie is for guest    
    if(guestAccess){
      console.log("Guest cookie found")
      setGuest(guestAccess)

      //load cart from database
      console.log("Loading cart")
      fetchGuestCart(guestAccess)
    }else{
      setGuest("")
    }

  },[])
  


  useEffect(()=>{

    // const userAccess = Cookie.get('accessToken')
    // const guestAccess = Cookie.get('guestID')

    // //updating the cart when an item is added or removed
    // const updateOrder = async (token)=>{
    //   if(!isLoading && !error){
    //     console.log("Trying to update user cart")

    //     await fetch(`http://localhost:8000/user/cart/update`, {
    //       method:'POST',
    //       headers:{
    //         'Content-Type':'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         'authorization':`Bearer ${token}`
    //       },
    //       mode:'cors',
    //       body:JSON.stringify(order)
    //     }).then(async res => await res.json()).then(data=>{
    //       //allow other operations once done
    //       setBlocking(false)
    //     })
    //   }else if(guest != 0){
    //     console.log("Trying to update guest cart")

    //     await fetch(`http://localhost:8000/guest/${guest}/cart/update`, {
    //       method:'POST',
    //       headers:{
    //         'Content-Type':'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //       },
    //       mode:'cors',
    //       body:JSON.stringify(order)
    //     }).then(async res => await res.json()).then(data=>{
    //       //allow other operations once done
    //       setBlocking(false)
    //     })
    //   }
    // }


    // if(userAccess) updateOrder(userAccess);

  }, [order])
  


  //This should be the method to put items in the cart
  const addToCart = async (product)=>{

    //block other operations
    setBlocking(true)

    const token = Cookie.get('accessToken')

    //if no cookie is found, adding to cart causes an identifier to be given to the guest
    // if(user == 0 && guest == 0){
    //   let gID = uuidv4() //change to random uuid
    //   Cookie.set("guestID", gID)
    //   setGuest(gID)
    // }

    await fetch(`http://localhost:8000/user/cart/add`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization':`Bearer ${token}`
      },
      mode:'cors',
      body:JSON.stringify({
        product:product
      })
    }).then(async res => await res.json()).then(data=>{

      fetchUserCart(token)

      //allow other operations once done
      setBlocking(false)
    })
  }

  const removeFromCart = async (product)=>{

    //block other operations
    setBlocking(true)

    const token = Cookie.get('accessToken')

    //if no cookie is found, adding to cart causes an identifier to be given to the guest
    // if(user == 0 && guest == 0){
    //   let gID = uuidv4() //change to random uuid
    //   Cookie.set("guestID", gID)
    //   setGuest(gID)
    // }

    await fetch(`http://localhost:8000/user/cart/remove`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization':`Bearer ${token}`
      },
      mode:'cors',
      body:JSON.stringify({
        product:product
      })
    }).then(async res => await res.json()).then(data=>{

      fetchUserCart(token)

      //allow other operations once done
      setBlocking(false)
    })


  }

  const clearCart = ()=>{
    setOrder({
      items:[],
      subtotal:0
    })
  }

  const toggleLoading = ()=>{
    setLoading(!loading)
  }

  //update the nav bar when a user signs in, hides authentication options and adds profile link
  const toggleNav = ()=>{
    setUpdate(prev => !prev)
  }

  // const layouts = ({children})=> <Layout userShop={userShop} toggleNav={toggleNav} order={order} update={update} addItem={addItem} removeItem={removeItem} blocking={blocking}>{children}</Layout>

  const MainLayout = Component.Layout || Layout

  return (
      <userContext.Provider value={{ loading, setLoading, clearCart, addToCart, removeFromCart}}>
        {isLoading && <p>loading...</p>}
        <MainLayout userShop={userShop} toggleNav={toggleNav} order={order} update={update} blocking={blocking} loading={loading}>
          <Component {...pageProps} profile={profile} toggleLoading={toggleLoading} shop={shop} toggleNav={toggleNav} addToCart={addToCart} blocking={blocking} order={order} user={user} guest={guest} clear={clearCart}/>
        </MainLayout>
      </userContext.Provider>
  )
}

export default MyApp
