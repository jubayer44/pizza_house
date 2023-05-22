import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const login = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const notify = () => toast('Here is your toast.');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`https://pizza-house-jubayer44.vercel.app/api/login`, {
      // const res = await axios.post(`https://pizza-house-dev-jubayer44.vercel.app/api/login`, {
        userName,
        password,
      });
      if (res.status === 200) {
        toast.success("Login Success");
        setError('')
        router.push("/dashboard");
        setIsLoading(false);
      }
    } catch (err) {
      setError(err?.response?.data)
      toast.error(err?.response?.data)
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="mb-4 mt-20 flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 rounded-md bg-blue-600 p-6 text-white">
          <p className="mb-8 text-3xl flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 512 512"
              className="inline-block fill-current h-8 w-8 mr-2"
            >
              <path d="m64 496l0-256 48 0 0-80c0-71 57-128 128-128l16 0c71 0 128 57 128 128l0 80 48 0 0 256z m172-131l-12 83 48 0-12-83c12-5 20-17 20-30 0-18-14-32-32-32-18 0-32 14-32 32 0 13 8 25 20 30z m100-197c0-49-39-88-88-88-49 0-88 39-88 88l0 72 176 0z" />
            </svg>
            Login Now
          </p>
          <div className="mb-4">
            <input
              onChange={(e) => setUserName(e.target.value)}
              name="user"
              required
              className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
              className="appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {!isLoading ? "Login" : <div className="w-6 h-6 mx-auto border-4 border-dashed rounded-full animate-spin"></div>}
          </button>

          <p className="text-red-500 mt-2 font-bold">{error}</p>
          <br />

          <a
            className="block w-full text-sm text-right text-white hover:text-gray-300"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default login;
