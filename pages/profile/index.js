import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/profile/profile.module.css'
import AuthenticatedRoute from '../../components/authenticatedRoute'
import ShippingModal from '../../components/modals/shipping'

import {useState, useContext, useEffect} from 'react'
import { userContext } from '@/context/store'
import { useUser } from '@/hooks/swrHooks'
import Cookie from 'cookie-cutter'

import { parseCookies, destroyCookie, setCookie } from 'nookies'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function Profile({profile, cookies}) {

  const [orders, setOrders] = useState(0)
  const [spent, setSpent] = useState(0)
  const [products, setProducts] = useState(0)

  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState({})
  const [shipping, setShipping] = useState([])

  const {user_p, error, isLoading} = useUser()
  const axiosPriv = useAxiosPrivate()


  const toggleModal = ()=>{
    setModal(prev=>!prev)
  }

  const saveShippingAddress = async (address)=>{

    await axiosPriv.post('/user/add/address', {...address}).then(res => res.data)
    .then(address => {
      console.log({address})
      fetchAddress()
    })

  }

  const updateShippingAddress = async (address, id)=>{

    await axiosPriv.post(`/user/update/address/${id}`, {...address}).then(res => res.data)
    .then(address => {
      console.log({address})
      fetchAddress()
    })

  }

  const deleteAddress = async (id) =>{

    await axiosPriv.delete(`/user/remove/address/${id}`).then(res => res.data)
    .then(address => {
      fetchAddress()
    })

  }

  const fetchAddress = async ()=>{

    await axiosPriv.get('/user/get/address').then(res => res.data)
    .then(address => {
      console.log({address})
      setShipping(address)
    })

  }


  useEffect(()=>{

    fetchAddress()

  },[])


  return (
    <AuthenticatedRoute>
      <div>
        <Head>
          <title>Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.container}>          
          <div className={styles.left}>
            <p>Account Information</p>
            <div className={styles.info}>
                <p className={styles.labels}>First Name</p>
                {!isLoading && !error && user_p &&
                  <p>{user_p.first_name}</p>
                }
            </div>
            <div className={styles.info}>
                <p className={styles.labels}>Last Name</p>
                {!isLoading && !error && user_p &&
                  <p>{user_p.last_name}</p>
                }
            </div>
            <div className={styles.info}>
                <p className={styles.labels}>Email</p>
                {!isLoading && !error && user_p &&
                  <p>{user_p.email}</p>
                }
            </div>
            <div className={styles.info}>
                <p className={styles.labels}>Password</p>
                <button className={styles.change}>Change password</button>
            </div>
          </div>
          <div className={styles.right}>
            <p>Shipping Address</p>
            <div>
              {shipping.length > 0 ?
                shipping.map((address)=>(
                  <div className={styles.address}>
                    <div className={styles.top}>
                      <p><strong>{address.first_name} {address.last_name}</strong></p>
                      <div className={styles.options}>
                        <p onClick={()=>{
                          setEdit(address)
                          toggleModal()
                        }}>Edit</p>
                        <p onClick={()=>{
                          deleteAddress(address._id)
                        }}>Delete</p>
                      </div>
                    </div>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.country}</p>
                    <p>{address.postal}</p>
                    <p>{address.phone_number}</p>
                  </div>
                )) :
                <h3 className={styles.no_address}>No shipping address</h3>
              }
            </div>
            <button className={styles.add_address} onClick={()=>{
              setEdit({})
              toggleModal()
              }}>Add Shipping Address</button>
          </div>
        </main>
      </div>
      
      {modal &&
        <ShippingModal toggle={toggleModal} save={saveShippingAddress} edit={edit} update={updateShippingAddress} profile={user_p}/>
      }

    </AuthenticatedRoute>
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