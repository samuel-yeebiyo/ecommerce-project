import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/profile/reviews.module.css'
import AuthenticatedRoute from '@/components/authenticatedRoute'
import Review from '@/components/Review'

import {useState, useEffect} from 'react'
import nookies from 'nookies'


import Cookie from 'cookie-cutter'

export default function Reviews({user}) {

  const [show, setShow] = useState(false)
  const [current, setCurrent] = useState({})
  const [pending, setPending] = useState([])
  const [completed, setCompleted] = useState([])
  const [editing, setEditing] = useState(false)

  const showElement = (item)=>{
    setShow(true)
    setCurrent(item)
  }

  const showEditElement = (item)=>{
    setShow(true)
    setCurrent(item)
    setEditing(true)
  }

  const hideElement = ()=>{
    setShow(false)
    setCurrent({})
    setEditing(false)
  }

  useEffect(()=>{

    // let isMounted = true;
    const userAccess = Cookie.get('accessToken')

    const fetchPendingReviews = async (token)=>{
      await fetch(`http://localhost:8000/user/get-pending-reviews`, {
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'cors',
          'authorization': `Bearer ${token}`
        },
        mode:'cors'
      }).then(async res=>await res.json()).then(data =>{
        console.log({data})
        setPending(data)
      })
    }

    const fetchCompletedReviews = async (token) =>{
      await fetch(`http://localhost:8000/user/get-completed-reviews`, {
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'cors',
          'authorization': `Bearer ${token}`
        },
        mode:'cors'
      }).then(async res=>await res.json()).then(data =>{
        console.log({data})
        setCompleted(data)
      })
    }

    completed.length == 0 && fetchCompletedReviews(userAccess)
    pending.length == 0 && fetchPendingReviews(userAccess)

    // return () => { isMounted = false}

  },[])

  useEffect(()=>{
    console.log({pending})
  },[pending])

  useEffect(()=>{
    console.log({current})
  },[current])

  return (
    // <AuthenticatedRoute>
      <div>
        <Head>
          <title>Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={!show ? styles.container : [styles.container, styles.show].join(" ")}>
          <div className={styles.list}>         
            <p>Pending Reviews</p>
            <span>All pending reviews</span>
            {pending.length > 0 ? pending.map((item) => (
              <div onClick={()=>{
              showElement(item.product)
              }} className={styles.product}>
                <div className={styles.img_container}>
                  <img src={item.product.primary}/>
                </div>
                <div>
                  <p>Product Id: {item.product._id}</p>
                  <p>{item.product.name}</p>
                  <p>?/5</p>
                </div>
              </div>
            )) : <div className={styles.empty}>No pending review</div>}

            <p>Completed Reviews</p>
            <span>All completed reviews</span>
            {completed.length > 0 ? completed.map((item) => (
              <div onClick={()=>{
              showEditElement(item)
              }} className={styles.product}>
                <div className={styles.img_container}>
                  <img src={item.image}/>
                </div>
                <div>
                  <p>{item.productName}</p>
                  <p>{item.title}</p>
                  <p>{item.name}</p>
                  <p>{item.rating}/5</p>
                </div>
              </div>
            )) : <div className={styles.empty}>No completed review</div>}


          </div> 
          <div className={styles.details}>
            <Review toggle={hideElement} item={current} user={user} editing={editing} show={show}/>
          </div>
        </main>
      </div>
    // </AuthenticatedRoute>
  )
}

export async function getServerSideProps(context){

  const cookies = nookies.get(context)

  console.log({cookies})

  if(!cookies.accessToken) {
    return {
      redirect:{
        permanent:false,
        destination:'/signin'
      }
    }
  }

  return{
    props:{
      cookies
    }
  }
}