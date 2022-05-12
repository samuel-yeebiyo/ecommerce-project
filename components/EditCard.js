import Link from 'next/link'
import { useRouter } from 'next/router'
import ProductCard from './productCard'
import styles from 'styles/component/editcard.module.css'
import { userContext } from '@/context/store'
import { useContext } from 'react'

export default function EditCard({product, edit, cookies}) {

  const router = useRouter()
  const {setLoading} = useContext(userContext)

  const remove = async(id)=>{
    setLoading(true)

    const {accessToken} = cookies

    await fetch(`http://localhost:8000/shops/delete/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'authorization': `Bearer ${accessToken}`
      }
    }).then(async res=> await res.json()).then(data=>{
      console.log(data)
      setLoading(false)
      router.reload()
    })
  }


  return (
      <div>
        <ProductCard product={product}/>
        <div className={styles.editing}>
          <div className={styles.edit}onClick={()=>{edit(product)}}>Edit</div>
          <div className={styles.remove}onClick={()=>remove(product._id)}>Remove</div>
        </div>
      </div>
  )
}
