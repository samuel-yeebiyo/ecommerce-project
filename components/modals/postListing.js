import styles from '../../styles/modals/postlisting.module.css'
import { useRouter } from 'next/router'

export default function PostListing({toggle}) {

    const router = useRouter()

  return (
      <div className="modal_background">
        <div className={styles.card}>
            <div>
                <p className={styles.title}>Shop Created Successfully!</p>
                <p>Would you like to create your first listing now?</p>
            </div>
            <div className={styles.choices}>
                <button onClick={()=>router.replace('/myshop/listings')}>Go to Listings</button>
                <button onClick={()=>router.replace('/myshop/')}>Cancel</button>
            </div>
        </div>
      </div>
  )
}
