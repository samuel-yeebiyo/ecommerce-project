import {useState, useEffect} from 'react'
import Head from 'next/head'
import ShopAdmin from '@/layouts/shopadmin'
import styles from 'styles/shopadmin/settings.module.css'

export default function myshop(){
    return(
        <div>
            <Head>
                <title>My Shop</title>
            </Head>
            <main className={styles.overview_container}>
                <p className={styles.title}>Manage Shop</p>
                <div className={styles.content}>
                    <p>Shop Image</p>
                    <form className={styles.setting_form}>
                        <label className={styles.input_button}> +
                            <input className={styles.image_input} type="file"/>
                        </label>
                        <label>Shop Name</label>
                        <input placeholder='Name' type='text'/>
                        <label>Shop ID</label>
                        <input placeholder='ID' type='text'/>
                        <label>Shop Description</label>
                        <textarea placeholder='Description' type='text'/>
                        <button>Save</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

myshop.Layout = ShopAdmin