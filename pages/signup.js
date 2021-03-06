import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '/styles/base/signup.module.css'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { userContext } from '@/context/store'
import {useState, useContext} from 'react'
import Cookie from 'cookie-cutter'
import GuestRoute from '@/components/guestRoute'
import { useUser } from '@/hooks/swrHooks'
import { guestToken } from '@/hooks/useCookies'
import { destroyCookie, setCookie } from 'nookies'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import axiosInstance from '@/lib/api/baseAxios'

export default function SignUp({order}) {

  const router = useRouter()
  const {mutate} = useUser()

  const axiosPriv = useAxiosPrivate()

  const formik = useFormik({
    initialValues:{
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      confirmation:''
    },
    validate: values =>{
      const errors={}
      if(!values.first_name){
        errors.first_name="Required"
      }
      if(!values.last_name){
        errors.last_name="Required"
      }
      if(!values.email){
        errors.email="Required"
      }
      if(!values.password){
        errors.password="Required"
      }
      if(!values.confirmation){
        errors.confirmation="Required"
      }else if(values.confirmation != values.password){
        errors.confirmation="Must match password"
      }
      return errors
    },
    onSubmit: values=>{

      console.log(values)
      
      axiosInstance.post('/register/', {...values}).then(res => res.data).then(async data =>{

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

  return (
    <GuestRoute>
    <div>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.signup_container}>
        <div className={styles.signup}>
          <div className={styles.form_section}>
            <form onSubmit={formik.handleSubmit} className={styles.su_form}>
              <p>Sign Up</p>
              <div className={styles.input_req}>
                <input placeholder='First Name' id='first_name' name='first_name' type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.first_name}/>
                {formik.touched.first_name && formik.errors.first_name ? <div className={styles.err}>{formik.errors.first_name}</div> : null}
              </div>
              <div className={styles.input_req}>
                <input placeholder='Last Name' id='last_name' name='last_name' type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.last_name}/>
                {formik.touched.last_name && formik.errors.last_name ? <div className={styles.err}>{formik.errors.last_name}</div> : null}
              </div>
              <div className={styles.input_req}>
                <input placeholder='Email address' id='email' name='email' type='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                {formik.touched.email && formik.errors.email ? <div className={styles.err}>{formik.errors.email}</div> : null}
              </div>
              <div className={styles.input_req}>
                <input placeholder='Password'id='password' name='password' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                {formik.touched.password && formik.errors.password ? <div className={styles.err}>{formik.errors.password}</div> : null}
              </div>
              <div className={styles.input_req}>
                <input placeholder='Confirm Password' id='confirmation' name='confirmation' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmation}/>
                {formik.touched.confirmation && formik.errors.confirmation ? <div className={styles.err}>{formik.errors.confirmation}</div> : null}
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