import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/profile/profile.module.css'
import AuthenticatedRoute from '../../components/authenticatedRoute'

export default function Profile() {
  return (
    <AuthenticatedRoute>
      <div>
        <Head>
          <title>Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.container}>          
          <div className={styles.left}>
            <p>Account Information</p>
            <div className={styles.info}>
                <p className={styles.labels}>Username</p>
                <p>sam</p>
            </div>
            <div className={styles.info}>
                <p className={styles.labels}>Email</p>
                <p>sam@sam.com</p>
            </div>
            <div className={styles.info}>
                <p className={styles.labels}>Password</p>
                <button>Change password</button>
            </div>
          </div>
          <div className={styles.right}>
            <p>Overview</p>
            <div className={styles.overview}>
              <p>Orders complete: <span>0</span></p>
              <p>Amount spent: <span>0</span></p>
              <p>Products acquired: <span>0</span></p>
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedRoute>
  )
}