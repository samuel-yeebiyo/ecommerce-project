import Navbar from "../components/navbar"
import Cart from "../components/cart"
import Footer from "../components/footer"
import ProfileLayout from "./ProfileLayout"
import {useState, useEffect} from 'react'
import { useRouter } from "next/router"
import { useWindowSize } from "@/hooks/useWidth"

import styles from "styles/layouts/layout.module.css"

export default function Layout({children, toggleNav, order, update, addItem, loading, removeItem, blocking, userShop}) {

  const [cartState, setCartState] = useState(false)
  const [profile, setProfile] = useState(false)
  const router = useRouter()

  const {width, height}= useWindowSize()

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

  return (
    <div className={styles.overall}>
      <div className={styles.layout}>
        <Navbar order={order} toggleNav={toggleNav} toggle={toggleCart} update={update} userShop={userShop}/>
        <Cart state={cartState} toggle={toggleCart} order={order} removeItem={removeItem} addItem={addItem} blocking={blocking}/>
        <main className={styles.master_container}>
          {profile ?
            width > 900 ?
            <ProfileLayout>
              {children}
            </ProfileLayout>
            :
            <div className={styles.profile_pages}>
              {children}
            </div>
            :
            children
          }
        </main>
      </div>
      <Footer/>

      {loading &&
          <div className={styles.loading}>
              <div>
                  <p>Loading........</p>
              </div>
          </div>
      }
    </div>
  )
}
