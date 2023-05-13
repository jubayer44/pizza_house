import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

const Dashboard = ({ products, orders }) => {
  const [status, setStatus] = useState(0);
  const router = useRouter();

  const handleStates = () => {
    setStatus(status + 1);
  };

  //delete products
  const deleteProducts = async (id) => {
    const find = products.find((p) => p?._id === id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      if (res.status === 200) {
        router.replace(router.asPath);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="antialiased my-10 text-gray-600  px-4 md:flex justify-evenly">
      <section >
        <div >
          {/* <!-- Table --> */}
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-center">
                Products
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-wrap">
                        <div className="font-semibold text-left">No:</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">ID</div>
                      </th>

                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {products?.map((product, i) => (
                      <tr key={product?._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{i + 1}.</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <Image
                                className="rounded-full"
                                src={product?.img}
                                width="40"
                                height="40"
                                alt=""
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              {product?.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{product?._id}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg  flex gap-4 justify-center">
                            <PencilIcon className="w-6 h-6 cursor-pointer" />
                            <TrashIcon
                              onClick={() => deleteProducts(product?._id)}
                              className="w-6 h-6 cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section >
        <div >
          {/* <!-- Table --> */}
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-center">
                Orders
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Order ID</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Customer</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Total</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Payment</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Status</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {orders?.map((order) => (
                      <tr key={order?._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{order?._id}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{order?.customer}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium ">
                            ${order?.total}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            <p>paid</p>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium ">
                            {/* {order?.status < 1 && "Preparing" || order?.status === 1 && "On the way" || order?.status >= 2 && "Delivered"} */}
                            {(order?.status === 0 && "Preparing") ||
                              (order?.status === 1 && "On the way") ||
                              (order?.status === 2 && "Waiting for Delivery") ||
                              (order?.status >= 3 && "Delivered")}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <button className="text-white font-bold px-2 py-1 rounded-md bg-red-500 text-xs">
                            Cancel
                          </button>
                          <button
                            onClick={handleStates}
                            className="text-white font-bold px-2 py-1 rounded-md bg-green-500 text-xs ml-2"
                          >
                            Next
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/products");
  const response = await axios.get("http://localhost:3000/api/orders");
  return {
    props: {
      products: res.data,
      orders: response.data,
    },
  };
}

export default Dashboard;
