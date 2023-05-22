import Image from "next/image";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "pages/_app";

const Product = ({ d }) => {
  console.log(process.env.NEXT_PUBLIC_URL);
  const { count, setCount } = useContext(AppContext);
  const [myCart, setMyCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(d?.prices[0]);
  const [size, setSize] = useState(0);
  const [ext, setExt] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(0);
  const [cartId, setCartId] = useState(
    Math.floor(Math.random() * 100000000000 + 1)
  );

  //items for cart
  const cartItem = {
    name: d?.name,
    des: d?.des,
    img: d?.img,
    id: cartId,
    pizzaSize: size,
    extra: "",
    price,
    quantity,
    ext,
  };

  useEffect(() => {
    const storedCartQuantity = JSON.parse(localStorage.getItem("cartQuantity"));
    if (storedCartQuantity === null) {
      setMyCart([]);
    } else {
      setMyCart(storedCartQuantity);
    }
  }, []);

  //add to cart
  const handleAddToCart = () => {
    setCartId(Math.floor(Math.random() * 100000000000 + 1));
    setMyCart([...myCart, cartItem]);
    localStorage.setItem("cartQuantity", JSON.stringify([...myCart, cartItem]));
    setCount(count + 1);
  };

  //change pizza size
  const changeSize = (index) => {
    const newPrice = d?.prices[index] - d?.prices[size];
    setSize(index);
    changePrice(newPrice);
  };

  //price change
  const changePrice = (num) => {
    setPrice(price + num);
  };

  //checked options
  const handleChange = (e, opt) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(opt.price);
      setExt((prev) => [...prev, opt]);
    } else {
      changePrice(-opt.price);
      setExt(ext.filter((e) => e._id !== opt._id));
    }
  };

  return (
    <div className="my-10 mx-2">
      <div className="flex justify-between">
        <div className="w-1/2">
          <Image
            className="mx-auto w-[500px] h-[500px]"
            src={d?.img}
            alt=""
            height={500}
            width={500}
            priority={true}
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold my-4">{d?.name}</h1>
          <h3 className="text-2xl font-semibold text-pink-500 my-2">
            ${price}
          </h3>
          <p className="my-2">{d?.des}</p>
          <div className="my-2">
            <h2 className="text-3xl font-bold">Choose the size</h2>
            <div className="my-4 flex gap-10">
              <div
                className={`relative cursor-pointer p-4 rounded-md ${
                  selectedPizza === 0 && "bg-gray-200"
                }`}
                onClick={() => {
                  changeSize(0);
                  setSelectedPizza(0);
                }}
              >
                <Image src="/Images/size.png" alt="" height={40} width={40} />
                <p className="bg-green-500 text-sm absolute px-2 rounded-xl -top-2 font-semibold text-white left-4">
                  small
                </p>
              </div>
              <div
                className={`relative cursor-pointer p-4 rounded-md ${
                  selectedPizza === 1 && "bg-gray-200"
                }`}
                onClick={() => {
                  changeSize(1);
                  setSelectedPizza(1);
                }}
              >
                <Image src="/Images/size.png" alt="" height={50} width={50} />
                <p className="bg-green-500 text-sm absolute px-2 rounded-xl -top-2 font-semibold text-white left-4">
                  medium
                </p>
              </div>
              <div
                className={`relative cursor-pointer p-4 rounded-md ${
                  selectedPizza === 2 && "bg-gray-200"
                }`}
                onClick={() => {
                  changeSize(2);
                  setSelectedPizza(2);
                }}
              >
                <Image src="/Images/size.png" alt="" height={60} width={60} />
                <p className="bg-green-500 text-sm absolute px-2 rounded-xl -top-2 font-semibold text-white left-4">
                  large
                </p>
              </div>
            </div>
            <h2 className="text-3xl font-bold my-3">
              Choose additional ingredients
            </h2>
            <div className="flex gap-10">
              {d?.extraOptions.map((opt, i) => (
                <div key={opt?._id} onChange={(e) => handleChange(e, opt)}>
                  <input
                    type="checkbox"
                    id={opt?._id}
                    name="double-ingredients"
                    value="double ingredients"
                  />
                  <label htmlFor={opt?._id}> {opt?.text}</label>
                </div>
              ))}
            </div>
            <div className="my-5">
              <input
                onChange={(e) => setQuantity(e.target.value)}
                className="border py-2 w-20 mr-3 px-2 rounded-md"
                required
                type="number"
                name=""
                id=""
                value={quantity}
              />
              <button
                onClick={() => {
                  handleAddToCart();
                  // handleSetLocalStore();
                }}
                className="font-semibold bg-pink-500 p-2 rounded-md text-white "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

export async function getServerSideProps({ params }) {
  const res = await axios.get(`https://pizza-house-jubayer44.vercel.app/api/products/${params.id}`);
  // const res = await fetch(`https://pizza-house-jubayer44.vercel.app/api/products/${params.id}`)
  // const data = await res.json();

  return {
    props: {
      d: res?.data,
    },
  };
}
