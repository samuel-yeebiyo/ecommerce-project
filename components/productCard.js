import styles from '../styles/productcard.module.css'


export default function ProductCard({product}) {
  return (
    <div className={styles.product}>
    <div className={styles.image}></div>
    <button className={styles.add} onClick={()=>{
    //   addToCart({
    //     productId:product._id,
    //     name:product.name,
    //     price:product.price
    //   })
    }}>Add to cart</button>
  </div>
  )
}
