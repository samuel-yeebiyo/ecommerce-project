import * as splToken from "@solana/spl-token"
import { web3, Wallet,  } from "@project-serum/anchor"
import {Connection, clusterApiUrl} from "@solana/web3.js"
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes"

import styles from 'styles/component/connect.module.css'
import Cookie from 'cookie-cutter'
import nookies from 'nookies'
import { userContext } from "@/context/store"
import { useContext } from "react"
import { useUser } from "@/hooks/swrHooks"


export default function Transaction({total, user, email, confirm, clear}){

    const {user_p, error, isLoading} = useUser()
    const {setLoading, clearCart} = useContext(userContext)


    async function transfer(tokenMintAddress, wallet, to, connection, amount){

        setLoading(true)

        const mintPublicKey = new web3.PublicKey(tokenMintAddress)
        const {TOKEN_PROGRAM_ID} = splToken
    
        const fromTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
            connection,
            wallet.payer,
            mintPublicKey,
            wallet._publicKey
        )
    
        const destPublicKey = new web3.PublicKey(to)
    
        const associatedDestinationTokenAddr = await splToken.getOrCreateAssociatedTokenAccount(
            connection,
            wallet.payer,
            mintPublicKey,
            destPublicKey
        )

        // const associatedDestinationTokenAddr = await web3.PublicKey.findProgramAddress(
        //     [
        //         destPublicKey.toBuffer(),
        //         TOKEN_PROGRAM_ID.toBuffer(),
        //         mintPublicKey.toBuffer(),
        //     ],
        //     TOKEN_PROGRAM_ID
        // )

    
        // const recieverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr.address)
    
        const instructions = []
    
        instructions.push(
            splToken.createTransferInstruction(
                fromTokenAccount.address,
                associatedDestinationTokenAddr.address,
                wallet.publicKey,
                amount,
                [],
                TOKEN_PROGRAM_ID
            )
        )
    
        // const transaction = new web3.Transaction().add(...instructions)
        // transaction.feePayer = wallet.publicKey;
        // transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash

        // const {signature} = await wallet.request({
        //     method: "signAndSendTransaction",
        //     params: {
        //         message:bs58.encode(transaction.serializeMessage())
        //     }
        // })
    
        //confirms the transaction and sends back the transaction id (hash/signature)
        // const confirmation = await connection.confirmTransaction(signature)
        const signature = 'sample'
        const confirmation = {value:{error: false}}
        console.log(confirmation)

        //the signature variable holds the transaction
        if(signature && confirmation && !confirmation.value.err){
            console.log("Transaction successful")
            
            const guest = Cookie.get('guestID')
            if(!user && email){
                await fetch(`http://localhost:8000/guest/${guest}/pay`,{
                    method:'POST',
                    headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*'
                    },
                    mode:'cors',
                    body:JSON.stringify({
                        email: email,
                        confirmation:signature
                    })
                }).then(async res => await res.json()).then(reciept => {
                    //get back reciept
                    //show receipt confirmation
                    confirm(reciept)
                    clear()
                })
            }else if(user_p.id){

                const {accessToken} = nookies.get()
                await fetch(`http://localhost:8000/user/pay`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin':'*',
                        'authorization':`Bearer ${accessToken}`
                    },
                    mode:'cors',
                    body:JSON.stringify({
                        confirmation:signature
                    })
                }).then(async res => await res.json()).then(reciept => {
                    //get back reciept
                    //show receipt confirmation
                    clearCart()
                    setLoading(false)
                    confirm(reciept)

                })
            }else{
                setLoading(false)
                console.log("Error encountered")
            }



        }
    
    }


    return(
        <button className={styles.connect} onClick={()=>{
            const connection  = new Connection(
                clusterApiUrl('mainnet-beta'),
                'confirmed'
            )
            const phantom = window["solana"]
            const amount = total*1000000000

            console.log(process.env.NEXT_PUBLIC_TOKEN)

            transfer(process.env.NEXT_PUBLIC_TOKEN, phantom, process.env.NEXT_PUBLIC_RECIEVER , connection, amount)


        }}>Pay Now</button>
    )
}