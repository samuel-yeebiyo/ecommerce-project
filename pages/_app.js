import 'styles/globals.css'
import Layout from '@/layouts/layout'
import {useState, useEffect, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import NProgress from 'nprogress'
import Cookie from 'cookie-cutter'
import Router from 'next/router'
import Head from 'next/head'

import { accessToken, guestToken } from '@/hooks/useCookies'

import { userContext } from '@/context/store'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAxiosGuest from '@/hooks/useAxiosGuest'

import axios from '@/lib/api/baseAxios'
import { useUser } from '@/hooks/swrHooks'

//Routing progress bar
Router.events.on('routeChangeStart', ()=> NProgress.start())
Router.events.on('routeChangeComplete', ()=> NProgress.done())
Router.events.on('routeChangeError', ()=> NProgress.done())

function MyApp({ Component, pageProps }) {

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
  const {mutate} = useUser()

  const axiosPriv = useAxiosPrivate()
  const axiosGuest = useAxiosGuest()

  const fetchUserCart = async () =>{

    console.log("Fetching user cart")

    axiosPriv.get('/user/cart').then(response => response.data).then(data =>{
      if(data.message != "No cart"){
        console.log("Cart found!")
        setOrder(data)
      }else{
        console.log("No cart")
      }
    })

    // await fetch(`http://localhost:8000/user/cart/`, {
    //   method:'GET',
    //   headers:{
    //     'Content-Type':'application/json',
    //     'authorization': `Bearer ${token}`
    //   }
    // }).then(async res => await res.json()).then(data =>{
    //   if(data.message != "No cart"){
    //     console.log("Cart found!")
    //     setOrder(data)
    //   }else{
    //     console.log("No cart")
    //   }
      
    // })
  }

  const fetchGuestCart = async(id) =>{

    console.log("Fetching guest cart")

    axiosGuest.get('/guest/cart').then(res => res.data).then(data =>{
      if(data.message != "No cart"){
        console.log("Cart found!")
        setOrder(data)
      }else{
        console.log("No cart")
      }
    })

    // await fetch(`http://localhost:8000/guest/${id}/cart/`)
    // .then(async res => await res.json()).then(data =>{
    //   if(data.message != "No cart"){
    //     console.log("Cart found!")
    //     setOrder(data)
    //   }else{
    //     console.log("No cart")
    //   }
    // })
  }



  //fetching respective carts on arrival
  useEffect(()=>{


    //check cookies
    const access = accessToken()
    const guestAccess = guestToken()    

  
    //if user cookie exists
    if(access){

      console.log("Logged in user found")
      mutate()
      
      //load user cart
      console.log("Loading cart")
      fetchUserCart(access)

    }else{
      
      console.log("No user, using current guest token or providing new one")
      console.log("Loading guest cart")
      //load guest cart if it exists
      fetchGuestCart(guestAccess)

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

    const userAccessToken = accessToken()
    const guestAcessToken = guestToken()

    //check if guest token or a user token exists
    if(userAccessToken){

      await axiosPriv.post('/user/cart/add', {
        product:product
      }).then(res => res.data).then(data=>{

        fetchUserCart()
  
        //allow other operations once done
        setBlocking(false)
      })


    }else if(guestAcessToken){

      await axiosGuest.post('/guest/cart/add', {
        product:product
      }).then(res => res.data).then( data => {
        
        fetchGuestCart()
        setBlocking(false)
      })

    }

    // await fetch(`http://localhost:8000/user/cart/add`, {
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'authorization':`Bearer ${userToken}`
    //   },
    //   mode:'cors',
    //   body:JSON.stringify({
    //     product:product
    //   })
    // }).then(async res => await res.json()).then(data=>{

    //   fetchUserCart(userToken)

    //   //allow other operations once done
    //   setBlocking(false)
    // })
  }

  const removeFromCart = async (product)=>{

    //block other operations
    setBlocking(true)

    const token = Cookie.get('accessToken')

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
        <MainLayout userShop={userShop} toggleNav={toggleNav} order={order} update={update} blocking={blocking} loading={loading}>
          <Component {...pageProps} profile={profile} toggleLoading={toggleLoading} shop={shop} toggleNav={toggleNav} addToCart={addToCart} blocking={blocking} order={order} user={user} guest={guest} clear={clearCart}/>
        </MainLayout>
      </userContext.Provider>
  )
}

export default MyApp
