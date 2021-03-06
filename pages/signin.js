import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {useRouter} from 'next/router'
import styles from 'styles/base/signin.module.css'
import { useFormik } from 'formik'

import {useState, useContext} from 'react'
import { useUser } from '@/hooks/swrHooks'

import GuestRoute from '@/components/guestRoute'
import { userContext } from '@/context/store'
import Cookie from 'cookie-cutter'
import { guestToken } from '@/hooks/useCookies'
import { destroyCookie, setCookie } from 'nookies'

import axiosInstance from '@/lib/api/baseAxios'

export default function SignIn({order}) {

  const router = useRouter()

  const {user_p, error, mutate, isLoading} = useUser()

  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validate: values =>{
      const errors={}
      if(!values.email){
        errors.email="Required"
      }
      if(!values.password){
        errors.password="Required"
      }
      return errors
    },
    onSubmit: values=>{

      console.log("trying to login")

      axiosInstance.post('/login', {...values}).then(res => res.data).then(async data =>{

        const guest = guestToken()
        const hasItem = order.items.length != 0
        
        if(hasItem){
          
          //let server transfer current cart to user
          await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/user/transfer/`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin':'*',
              'authorization': `Bearer ${data.accessToken}`
            },
            mode:'cors',
            body:JSON.stringify({
              guestToken: guest
            })
          }).then(async res => await res.json()).then(message => {
            console.log("Transfer complete")
            console.log(message)
            
            //delete guest cookie
            destroyCookie(null, 'guestToken', {path: '/'})
            
            //create user cookie
            setUserCookies(data.id, data.accessToken, data.refreshToken)
            mutate()
            window.location.replace("/")
          })
        }else{

          //delete guest token
          destroyCookie(null, 'guestToken', {path: '/'})

          //create user cookies
          setUserCookies(data.id, data.accessToken, data.refreshToken)
          mutate()
          // setUser(data.id)
          window.location.replace("/")
        }
      })
    }
  }) 
  
  const setUserCookies = (id, access, refresh)=>{

    setCookie(null, 'accessToken', access, {
      path:'/'
    })
    setCookie(null, 'refreshToken', refresh, {
      path:'/'
    })

    console.log("created cookies")
  }

  const {user, setUser} = useContext(userContext)

  return (
    <GuestRoute>
      <div>
        <Head>
          <title>Sign In</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.signup_container}>
          <div className={styles.signup}>
            <div className={styles.form_section}>
              <img className={styles.image} src="shopping.png"/>
              <form onSubmit={formik.handleSubmit} className={styles.su_form}>
                <p>Sign In</p>

                <div className={styles.input_req}>
                <input placeholder='Email' id='email' name='email' type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                {formik.touched.email && formik.errors.email ? <div className={styles.err}>{formik.errors.email}</div> : null}
                </div>
                <div className={styles.input_req}>
                <input placeholder='Password' id='password' name='password' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                {formik.touched.password && formik.errors.password ? <div className={styles.err}>{formik.errors.password}</div> : null}
                 </div>       
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </main>
          
      </div>
    </GuestRoute>
  )
}