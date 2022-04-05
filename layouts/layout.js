import Navbar from "../components/navbar"
import Cart from "../components/cart"
import Footer from "../components/footer"
import ProfileLayout from "./ProfileLayout"
import {useState, useEffect} from 'react'
import { useRouter } from "next/router"

import styles from "styles/layouts/layout.module.css"

export default function Layout({children, toggleNav, order, update, addItem, removeItem, blocking, userShop}) {

  const [cartState, setCartState] = useState(false)
  const [profile, setProfile] = useState(false)
  const router = useRouter()

  const toggleCart = ()=>{
      setCartState(!cartState);
  }

  useEffect(()=>{
    if(router.asPath.includes('/profile')){
      setProfile(true)
    }else{
      setProfile(false)
    }

  },[router.asPath])

  return (<>
      <div className={styles.layout}>
        <Navbar order={order} toggleNav={toggleNav} toggle={toggleCart} update={update} userShop={userShop}/>
        <Cart state={cartState} toggle={toggleCart} order={order} removeItem={removeItem} addItem={addItem} blocking={blocking}/>
        <main className={styles.master_container}>
          {profile ?
            <ProfileLayout>
              {children}
            </ProfileLayout>
            :
            children
          }
        </main>
      </div>
      <Footer/>
      </>
  )
}
