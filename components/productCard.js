import Link from 'next/link'

import styles from 'styles/component/productcard.module.css'


export default function ProductCard({product}) {
  return (
    <Link href={`/store/${product.pathname}`}>
      <a className={styles.product}>
        <div className={styles.image}>
          <img src={product.primary}/>
        </div>
        <div className={styles.detail}>
          <p>{product.name}</p>
          <p>{product.price} SAMO</p>
        </div>
      </a>
    </Link>
  )
}
