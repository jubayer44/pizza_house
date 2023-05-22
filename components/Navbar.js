import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import phoneLogo from "../public/Images/telephone.png";
import cartImg from "../public/Images/cart.png";
import { AppContext } from "pages/_app";
import { useRouter } from "next/router";

const Navbar = () => {
  const {count} = useContext(AppContext);
  const [ cartQuantity, setCartQuantity ] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  // const tkn = process.env.NEXT_PUBLIC_TOKEN;


  useEffect(() => {
    
    const storedCartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
      setCartQuantity(storedCartQuantity?.length);
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;
    if (token) {
      return setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [router.pathname, cartQuantity, count]);

  const handleLogOut = () => {
    document.cookie = "token=; max-age=0; path=/";
  };

  return (
    <div className="py-4 px-4 bg-pink-600 text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-[150px]">
            <div className="flex gap-4">
              <Image
                className="h-10 w-10 bg-white rounded-full p-2"
                src={phoneLogo}
                alt="phoneLogo"
              />
              <div>
                <p className="text-xs font-semibold">ORDER NOW!</p>
                <h2 className="font-semibold">(655) 656 6542</h2>
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <Link href="/" className="font-semibold">
                Home
              </Link>
              <Link href="/" className="font-semibold">
                Products
              </Link>
              <Link href="/" className="font-semibold">
                Menu
              </Link>
              <h2 className="text-2xl font-bold font-mono text-gray-300 underline">
                Pizza House
              </h2>
              <Link href="/" className="font-semibold">
                Events
              </Link>
              <Link href="/about" className="font-semibold">
                About
              </Link>
              <Link href="/" className="font-semibold">
                Contact
              </Link>
              <Link
                href="/dashboard"
                className={`font-semibold ${!isAdmin && "hidden"}`}
              >
                Dashboard
              </Link>
              <Link
                onClick={handleLogOut}
                href="/dashboard/login"
                className={`cursor-pointer font-semibold ${
                  !isAdmin && "hidden"
                }`}
              >
                Log Out
              </Link>
            </div>
          </div>
          <Link href={{pathname: "/cart", query: {data: "this is my data"}}} className="relative">
            <Image className="h-11 w-11 p-2" src={cartImg} alt="phoneLogo" />
            <p className={`bg-white text-pink-600 rounded-full px-2 font-bold absolute -top-2 -right-2 ${cartQuantity || "hidden"}`}>
              {cartQuantity}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
