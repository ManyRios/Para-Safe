import { useState, ChangeEvent } from "react";
import { useClient } from "@getpara/react-sdk";
import { interactWithSafe } from "../../clients/Safe";

export default function Transactions() {
  const [formData, setFormData] = useState({
    to: "",
    value: "",
  });
  const para = useClient();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form action="">
        <div className="mb-6">
          <label
            htmlFor="to"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            To
          </label>
          <input
            type="text"
            id="to"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="To address"
            onChange={handleChange}
            value={formData.to}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="value"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            type="text"
            id="value"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Amount"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            if (para) {
              interactWithSafe(para, formData.to, formData.value);
            }
          }}
        >
          Send
        </button>
      </form>
    </>
  );
}
