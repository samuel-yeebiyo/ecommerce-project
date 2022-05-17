import styles from 'styles/shopadmin/shopadminlayout.module.css' 
import Link from 'next/link' 
import { useRouter } from 'next/router'
import { useWindowSize } from '@/hooks/useWidth'


export default function shopadmin ({children, loading}){

    const router = useRouter()
    const {width, height} = useWindowSize()

    return (
        <div className={styles.main}>
            <div className={styles.sidebar}>
                <Link href="/">
                    {width > 900 ?
                        <p className={styles.brand_name}>Brand Name</p>
                        :
                        <p className={styles.brand_name}>BN</p>
                    }
                </Link>
                {width > 900 ?
                    <p className={styles.shop_name}>Shop Name</p>
                :
                    <p className={styles.shop_name}>SN</p>
                }
                
                <div className={styles.options}>

                    <Link href="/myshop/overview">
                        {width > 900 ?
                            <p className={router.asPath == "/myshop/overview" && styles.current}>Overview</p>
                            :
                            <p className={router.asPath == "/myshop/overview" && styles.current}>Ov</p>

                        }
                    </Link>
                    <Link href="/myshop/orders">
                        {width > 900 ?
                            <p className={router.asPath == "/myshop/orders" && styles.current}>Orders</p>
                            :
                            <p className={router.asPath == "/myshop/orders" && styles.current}>Or</p>

                        }
                    </Link>
                    <Link href="/myshop/stats">
                        {width > 900 ?
                            <p className={router.asPath == "/myshop/stats" && styles.current}>Stats</p>
                            :
                            <p className={router.asPath == "/myshop/stats" && styles.current}>St</p>

                        }
                    </Link>
                    <Link href="/myshop/listings">
                        {width > 900 ?
                            <p className={router.asPath == "/myshop/listings" && styles.current}>Listings</p>
                            :
                            <p className={router.asPath == "/myshop/listings" && styles.current}>Li</p>

                        }
                    </Link>
                    <Link href="/myshop/settings">
                        {width > 900 ?
                            <p className={router.asPath == "/myshop/settings" && styles.current}>Settings</p>
                            :
                            <p className={router.asPath == "/myshop/settings" && styles.current}>Se</p>

                        }
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

