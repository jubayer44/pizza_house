import Image from "next/image";
import { useContext, useLayoutEffect, useState } from "react";
import { AppContext } from "./_app";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";

const Cart = () => {
  const { cartQuantity, setCartQuantity } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  // console.log(router.query?.data);

  
  //created order
  const orderCreate = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 200) {
        console.log(res?.data);
        router.push(`/orders/${res?.data?._id}`);
        toast.success('Payment Successfully Done')
      }
    } catch (err) {
      toast.error('Something Went Wrong')
      console.log(err);
    }
  };

  //delete from cart
  const cartDelete = (id) => {
    setCartQuantity(cartQuantity.filter((c) => c.id !== id));
  };

  //calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartQuantity?.forEach((cart) => {
      totalPrice += cart?.price * cart?.quantity;
    });
    return totalPrice;
  };

  useLayoutEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
  }, []);

  //paypal pay
  const amount = totalPrice;
  const currency = "USD";
  const style = { layout: "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0];
              console.log(details);
              orderCreate({
                customer: shipping?.shipping?.name?.full_name,
                address: shipping?.shipping?.address?.address_line_1,
                total: shipping?.amount?.value,
                method: 1,
                orderId: shipping?.id,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="bg-gray-100 py-16 min-h-screen">
      <Toaster/>
      <h1 className="mb-10 text-center text-2xl font-bold">My Cart</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartQuantity?.map((data, idx) => {
            return (
              <div
                key={idx}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <Image
                  alt=""
                  src={data?.img}
                  width={70}
                  height={50}
                  className=" rounded-lg w-full md:w-24"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {data?.name}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      Size:{" "}
                      {(data?.pizzaSize == 0 && "Small") ||
                        (data?.pizzaSize == 1 && "Medium") ||
                        (data?.pizzaSize == 2 && "Large")}
                    </p>
                    <p className="my-2">Main Price: ${data?.price}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div>
                      <p>
                        Quantity:{" "}
                        <span className="font-semibold">{data?.quantity}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">
                        Price:{" "}
                        <span className="font-bold">
                          ${data?.price * data?.quantity}
                        </span>
                      </p>
                      <svg
                        onClick={() => cartDelete(data?.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${totalPrice} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>

          <div className={`${!open && "hidden"}`}>
            <button
              className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 mb-2`}
            >
              Cash On Delivery
            </button>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AU4pYd5-iyyTXfTJ1lHxTUXcJ7h5o8cCKSuCkHVb7OM9R7W2h83m-52inU56QOIW_m9TLpJpx4gX7lsN",
                components: "buttons",
                currency: "USD",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${
              open && "hidden"
            }`}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
