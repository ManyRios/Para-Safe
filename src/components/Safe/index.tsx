

export default function Safe() {
  //const [safeAddress, setSafeAddress] = useState<string>()

 /*  const para = useClient()

  useEffect(() => {

      async function init(){
         if(para){ 
           const safe = await safeSdk?.getAddress();
          console.log("Safe Owners:", await safeSdk?.getOwners());
          setSafeAddress(safe) 
        } 
      }
  }, []); */

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white  bg-green-950">
      <h1 className="text-white text-4xl font-bold">Safe + CapsulePara</h1>
      <p className="text-white font-bold text-center w-full">{'safeAdd'}</p>
      <p className="te">{}</p>
    </div>
  );
}
