import styles from 'styles/layouts/profilelayout.module.css'
import Link from 'next/link'

export default function profile({children}){
    return(
        <div className={styles.main_container}>
          <div className={styles.inner_container}>
            <div className={styles.side_options}>
              <ul className={styles.list}>
                <Link href="/profile/"><a>
                  <li>My Account</li>
                </a></Link>
                <Link href="/profile/orders"><a>
                  <li>Orders</li>
                </a></Link>
                <Link href="/profile/reviews"><a>
                  <li>Reviews</li>
                </a></Link>
                <Link href="/profile/saved"><a>
                  <li>Saved</li>
                </a></Link>
              </ul>
            </div>
            <div className={styles.content_container}>
              {children}
            </div>
          </div>
        </div>
    )
}