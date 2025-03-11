import {useState, useEffect} from 'react'
//import { sendTransaction } from "../../lib/transaction"

export default function Transactions(){
  const [first, setfirst] = useState('')
  useEffect(() => {
    console.log(first)
    setfirst('')
    
  }, [first])
  
 return (
    <>
    
    </>
  )
}