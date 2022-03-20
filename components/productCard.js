import Link from 'next/link'

import styles from '../styles/productcard.module.css'


export default function ProductCard({product}) {
  return (
    <Link href={`/shop/${product.pathname}`}>
      <a className={styles.product}>
        <div className={styles.image}>
          <img src="/product.png"/>
        </div>
        <div className={styles.detail}>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </a>
    </Link>
  )
}
