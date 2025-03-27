import { useStateContext } from "../../context/StateContext";

export default function Safe() {
  const { safeAcc } = useStateContext()

  /* const handleSafe = async () => {

  } */
  

  return (
    <div className="w-screen h-screen space-y-4 flex flex-col justify-center items-center text-white  bg-orange-900">
      <h1 className="text-white text-4xl font-bold">Safe + CapsulePara</h1>
      <p className="text-white font-bold text-center w-full">{safeAcc}</p>
      <button type="button" className="text-white bg-orange-800 hover:bg-transparent border-2 border-white  hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:focus:ring-blue-800">Deploy safe smart account</button>
    </div>
  );
}
