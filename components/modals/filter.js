import styles from '../../styles/modals/filter.module.css'

import { useState, useEffect } from 'react'

export default function Filter({toggle, set, apply}){


    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const [category, setCategory] = useState("")
    const [sortby, setSortby] = useState("none")

    useEffect(()=>{
        setMax(min)
    },[min])

    return(
        <div className="modal_background">
            <div className={styles.card}>
                <div className={styles.top}>
                    <p className={styles.title}>Filter & Sort</p>
                    <p onClick={toggle}>Cancel</p>
                </div>
                {/* <p>Filter</p> */}
                <div className={styles.form}>
                    <p>Price</p>
                    <div className={styles.price}>
                        <p>Min</p>
                        <input type="range" min="10" max="100" step="5" value={min} onChange={(e)=>setMin(e.target.value)}/>
                        <p>{min}</p>
                    </div>
                    <div className={styles.price}>
                        <p>Max</p>
                        <input type="range" min={min} max="100" step="5" value={max} onChange={(e)=>setMax(e.target.value)}/>
                        <p>{max}</p>
                    </div>
                    <p>Category</p>
                    <div className={styles.category}>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option>-- Category</option>
                            <option>Accessories</option>
                            <option>Books</option>
                            <option>Digital</option>
                            <option>Home</option>
                            <option>Kitchen</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <p>Sort By</p>
                    <div className={styles.sort} onChange={(e)=>setSortby(e.target.value)}>
                        <input type="radio" id="none" name="sorting" value="none"/>
                        <label htmlFor="none">None</label><br/>
                        <input type="radio" id="lowest" name="sorting" value="lowest_price"/>
                        <label htmlFor="lowest">Lowest Price</label><br/>
                        <input type="radio" id="highest" name="sorting" value="highest_price"/>
                        <label htmlFor="highest">Highest Price</label><br/>
                        <input type="radio" id="rating" name="sorting" value="rating"/>
                        <label htmlFor="rating">Best Rating</label><br/>
                        <input type="radio" id="recent" name="sorting" value="recent"/>
                        <label htmlFor="recent">Most Recent</label><br/>
                    </div>
                    <button onClick={()=>{
                        //function to apply filter & sort
                        apply(min, max, category, sortby)
                        toggle()
                    }}>Apply</button>
                </div>
            </div>
        </div>
    )
}