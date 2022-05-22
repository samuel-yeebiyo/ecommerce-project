import { useState } from 'react'
import nookies, { setCookie } from 'nookies'

//setting and getting access token
export const accessToken = () =>{
    const { accessToken } = nookies.get()
    return accessToken
}

export const setAccessToken = (token) => {
    setCookie(null, 'accessToken', token, { path:'/' })
}

//setting and getting refresh token
export const refreshToken = () =>{
    const { refreshToken } = nookies.get()
    return refreshToken
}

export const setAccesToken = (token) => {
    setCookie(null, 'refreshToken', token, { path:'/' })
}

//setting and getting guest token
export const guestToken = () => {
    const { guestToken } = nookies.get()
    return guestToken
}

export const setGuestToken = (token) => {
    setCookie(null, 'guestToken', token, { path:'/' })
}