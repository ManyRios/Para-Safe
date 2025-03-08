import { useState, useEffect } from "react";
import para from "../../clients/Para";
import {safeAddress, sendTransaction} from "../../clients/Safe";


export default function Safe() {
  const [address, setAddress] = useState('');
  
  useEffect(() => {
    if (para) {
       const init = async () => {
        setAddress(safeAddress);
        sendTransaction(safeAddress, '0x5fC8937C63328FDfa220618BCc78657434c16Ac9', '0.0001')
        /* if(isSafeDeployed){
            const balance = await newProtocolKit.getBalance()
            console.log( 'balance', balance)
        } */
        
       
      }
      init(); 
    }
    
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white  bg-green-950">
      <h1 className="text-white text-4xl font-bold">Safe + CapsulePara</h1>
      <p className="text-white font-bold text-center w-full">{address}</p>
      <p className="te">{}</p>
    </div>
  );
}
