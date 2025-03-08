interface IHero {
    isLogged: boolean;
    setIsModalOpen: (value: boolean) => void;
  }

export default function Hero({isLogged, setIsModalOpen }: IHero) {
  return (
    <div className="container flex flex-col justify-center items-center bg-green-800 h-80 rounded-md  space-y-10">
      <div className="flex text-center flex-col justify-center w-full">
        <h1 className="text-white text-4xl font-bold">
          Welcome to Capsule-Safe
        </h1>
        <h2 className="text-white text-2xl font-bold">
          Please Sign up or log in to start
        </h2>
      </div>
      <div className="flex items-center flex-row justify-center w-1/2">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-300 via-green-500 to-green-800 hover:bg-gradient-to-br hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setIsModalOpen(true)}
        >
          { isLogged ? "Connected" : "Sign in" }
        </button>
      </div>
    </div>
  );
}
