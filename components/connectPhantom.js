import { useState, useEffect } from "react";
import styles from '../styles/connect.module.css'
import Transaction from "./transaction";

const ConnectToPhantom = ({total, user, email}) => {

    const [phantom, setPhantom] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(()=>{
        if(window["solana"]?.isPhantom){
            setPhantom(window["solana"])
        }
    },  [])

    useEffect(() => {
        phantom?.on("connect", () => {
          setConnected(true);
        });
    
        phantom?.on("disconnect", () => {
          setConnected(false);
        });
    }, [phantom])


    const connectHandler = () => {
        phantom?.connect()
    }
    const disconnectHandler = () => {
        phantom?.disconnect()
    }


    return(
        <>
            <div className={styles.wallet}>
                <p>Connect your Phantom Wallet to complete your purchase.</p>
            </div>
            {phantom ?
                connected ?
                    <>
                        <button className={styles.connect} onClick={disconnectHandler}>Disconnect Phantom</button>
                        <Transaction user={user} email={email} total={total}/>
                    </> :
                    <button className={styles.connect} onClick={connectHandler}>Connect Phantom</button>
                :
                <a href="https://phantom.app/" target="_blank" className={styles.connect}>Get Phantom</a>
            }
        </>
    )

  };
  
  export default ConnectToPhantom;