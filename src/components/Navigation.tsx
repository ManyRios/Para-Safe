import { useAccount, useClient, useWallet } from "@getpara/react-sdk";

interface NavigationProps {
  isLogged?: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export default function Navigation({
  setIsModalOpen,
}: NavigationProps) {
  //const [paraAddress, setParaAddress] = useState('')
  const { data: wallet } = useWallet();
  const { data: account } = useAccount();
  const para = useClient(); 
  
  return (
    <div>
      <nav className="bg-white dark:bg-orange-600 fixed w-full z-20 top-0 start-0 border-b border-gray-200 border-2 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.jpg" className="h-8" alt="Paras" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Capsule-Safe
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {account?.isConnected && (
              <label
                htmlFor=""
                className=" text-center invisible flex md:visible text-white mr-2 justify-center p-auto items-center"
              >
                {
                  para
                  ? wallet
                    ? para.getDisplayAddress(wallet.id, { truncate: true, addressType: wallet.type })
                    : '' : ''} 
              </label>
            )}
            <button
              type="button"
              className="text-white bg-orange-800 hover:bg-transparent border-2 border-white  hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:focus:ring-blue-800"
              onClick={() => setIsModalOpen(true)}
            >
              {account?.isConnected ? "Connected" : "Sign in"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
