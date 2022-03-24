import styles from '../styles/listing.module.css'
import {useState, useEffect} from 'react'

export default function CreateListing () {

    const [uploaded, setUploaded] = useState([])

    const handleImages = ()=>{

    }
    const uploadImages = ()=>{

    }


    return(
        <div>
            {/* Add a product name */}
            <div className={styles.name}>
                <p>Product Name</p>
                <input placeholder='Name' type="text"/>
            </div>
            {/* Add a product primary image */}
            <p>Choose Primary Image</p>
            <label className="file-upload">+ 
                <input className={styles.choose} onChange={handleImages} type="file" name="image"></input>
            </label>
            {uploaded.length > 0 &&
            uploaded.map((item, index)=>(
                <div>
                    <img className="image" src={URL.createObjectURL(item)}/>  
                </div>
            ))
            }

            <button className="upload" onClick={uploadImages}>Upload Images</button>
            {/* Add product secondary images */}
            <p>Choose Secondary Images</p>
            <label className="file-upload">+ 
                <input className={styles.choose} onChange={handleImages} type="file" name="image" multiple></input>
            </label>
            {uploaded.length > 0 &&
            uploaded.map((item, index)=>(
                <div>
                    <img className="image" src={URL.createObjectURL(item)}/>  
                </div>
            ))
            }

            <button className="upload" onClick={uploadImages}>Upload Images</button>
            {/* Add product description */}
            <div className={styles.name}>
                <p>Product Description</p>
                <textarea placeholder='Description' type="text"/>
            </div>
            {/* Put in category */}
            {/* add tags */}
            <div className={styles.name}>
                <p>Tags</p>
                <input placeholder='Tags' type="text"/>
            </div>
        </div>
    )
}