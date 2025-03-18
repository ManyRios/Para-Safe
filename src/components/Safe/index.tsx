import { useStateContext } from "../../context/StateContext";

export default function Safe() {
  const { safeAcc } = useStateContext()

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white  bg-green-950">
      <h1 className="text-white text-4xl font-bold">Safe + CapsulePara</h1>
      <p className="text-white font-bold text-center w-full">{safeAcc}</p>
    </div>
  );
}
