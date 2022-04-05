import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from 'styles/component/editcard.module.css'


export default function EditCard({product, edit}) {

  const router = useRouter()

  const remove = async(id, shop)=>{
    await fetch(`http://localhost:8000/shops/${shop}/delete/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    }).then(async res=> await res.json()).then(data=>{
      console.log(data)
      router.reload()
    })
  }


  return (
      <div>
        <div className={styles.product}>
          <div className={styles.image}>
            <img src={product.primary}/>
          </div>
          <div className={styles.detail}>
            <p>{product.name}</p>
            <p>{product.price} SAMO</p>
          </div>
        </div>
        <div className={styles.editing}>
          <div onClick={()=>{
            edit(product)
          }}>Edit</div>
          <div onClick={()=>remove(product._id, product.shopId)}>Remove</div>
        </div>
      </div>
  )
}
