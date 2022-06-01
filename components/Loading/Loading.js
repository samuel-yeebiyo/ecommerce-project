import { AiOutlineLoading3Quarters } from "react-icons/ai"
import styles from './loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading}>
        <div>
            <AiOutlineLoading3Quarters size={100} className={styles.anim}/>
        </div>
    </div>
  )
}

export default Loading