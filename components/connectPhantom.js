import { useState, useEffect } from "react";
import styles from 'styles/component/connect.module.css'
import Transaction from "./transaction";

const ConnectToPhantom = ({total, user, email, confirm, clear, address}) => {

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
                        <Transaction confirm={confirm} user={user} address={address} email={email} total={total} clear={clear}/>
                    </> :
                    <button className={styles.connect} onClick={connectHandler}>Connect Phantom</button>
                :
                <a href="https://phantom.app/" target="_blank" rel="noreferrer" className={styles.connect}>Get Phantom</a>
            }
        </>
    )

  };
  
  export default ConnectToPhantom;