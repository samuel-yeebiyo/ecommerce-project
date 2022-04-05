import styles from 'styles/shopadmin/shopadminlayout.module.css' 
import Link from 'next/link' 
import { useRouter } from 'next/router'


export default function shopadmin ({children, loading}){

    const router = useRouter()

    return (
        <div className={styles.main}>
            <div className={styles.sidebar}>
                <Link href="/">
                    <p className={styles.brand_name}>Brand Name</p>
                </Link>
                <p className={styles.shop_name}>Shop Name</p>
                <div className={styles.options}>
                    <Link href="/myshop/overview">
                        <p className={router.asPath == "/myshop/overview" && styles.current}>Overview</p>
                    </Link>
                    <Link href="/myshop/orders">
                        <p className={router.asPath == "/myshop/orders" && styles.current}>Orders</p>
                    </Link>
                    <Link href="/myshop/listings">
                        <p className={router.asPath == "/myshop/listings" && styles.current}>Listings</p>
                    </Link>
                    <Link href="/myshop/settings">
                        <p className={router.asPath == "/myshop/settings" && styles.current}>Settings</p>
                    </Link>
                </div>
            </div>
            <div className={styles.admin_container}>{children}</div>
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

