import AddNewProduct from "@components/AddNewProduct";
import DeleteModal from "../../components/DeleteModal";
import toast, { Toaster } from "react-hot-toast";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";

const Dashboard = ({ dehydratedState }) => {
  let products = dehydratedState.queries[0]?.state?.data;
  let orders = dehydratedState.queries[1]?.state?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loadingId, setLoadingId] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { data: productsData, refetch: refetchProducts } = useQuery(
    "products",
    () =>
      axios.get(`https://pizza-house-jubayer44.vercel.app/api/products`).then((res) => res.data)
  );
  products = productsData;

  const { data: ordersData, refetch: refetchOrders } = useQuery("orders", () =>
    axios.get(`https://pizza-house-jubayer44.vercel.app/api/orders`).then((res) => res.data)
  );
  orders = ordersData;

  const handleStates = async (id) => {
    const findStatus = orders?.find((order) => order?._id === id);
    const newStatus = findStatus?.status;
    setLoadingId({ id, newStatus });

    try {
      const res = await axios.put(`https://pizza-house-jubayer44.vercel.app/api/orders/` + id, {
        status: newStatus + 1,
      });
      if (res.status === 200) {
        refetchOrders();
        setLoadingId("");
        // router.replace(router.asPath);
      }
    } catch (err) {
      setLoadingId("");
      console.log(err);
    }
  };

  //delete products
  const deleteProducts = async (id) => {
    try {
      const res = await axios.delete(
        `https://pizza-house-jubayer44.vercel.app/api/products/` + id
      );
      if (res.status === 200) {
        setIsModalOpen(false);
        toast.success("Delete Success");
        refetchProducts();
      }
    } catch (err) {
      console.log(err);
    }
    // router.replace(router.asPath);
  };

  return (
    <div className="antialiased my-10 text-gray-600  px-4 md:flex justify-evenly">
      <Toaster />
      <DeleteModal
        productId={productId}
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        deleteProducts={deleteProducts}
      />
      <AddNewProduct isOpen={isOpen} setIsOpen={setIsOpen} />
      <section>
        <div>
          {/* <!-- Table --> */}
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
              <h2 className="font-semibold text-gray-800 text-center">
                Products
              </h2>
              <button
                onClick={() => setIsOpen(true)}
                className="font-semibold text-gray-800 text-center border rounded-md p-2 bg-gray-100"
              >
                Add New Product
              </button>
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
                                className="rounded-full w-[40px] h-[40px]"
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
                              onClick={() => {
                                setProductId(product?._id);
                                setIsModalOpen(true);
                              }}
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
      <section>
        <div>
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
                        <td className="p-2 whitespace-nowrap flex">
                          <div
                            className={`text-white font-bold px-2 py-1 rounded-md bg-red-500 text-xs ${
                              order?.status >= 3 && "hidden"
                            }`}
                          >
                            Cancel
                          </div>
                          <button
                            disabled={order?.status >= 3}
                            onClick={() => handleStates(order?._id)}
                            className="text-white font-bold px-2 w-[60px] text-center py-1 rounded-md bg-green-500 text-xs ml-2 cursor-pointer"
                          >
                            {loadingId?.id === order?._id ? (
                              <div className="w-4 h-4 mx-auto border-4 border-dashed rounded-full animate-spin"></div>
                            ) : (
                              <>{order?.status >= 3 ? "done" : "Next"}</>
                            )}
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
export default Dashboard;

export async function getServerSideProps(context) {
  const myCookie = context?.req?.cookies || "";

  if (myCookie?.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/dashboard/login",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", () =>
    axios.get(`https://pizza-house-jubayer44.vercel.app/api/products`).then((res) => res.data)
  );

  await queryClient.prefetchQuery("orders", () =>
    axios.get(`https://pizza-house-jubayer44.vercel.app/api/orders`).then((res) => res.data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

// export async function getServerSideProps(context) {

//   const myCookie = context?.req?.cookies || "";

//   if(myCookie?.token !== process.env.TOKEN){
//     return {
//       redirect: {
//         destination: "/dashboard/login",
//         permanent: false,
//       }
//     }
//   }

//   const res = await axios.get(`https://pizza-house-jubayer44.vercel.app/api/products`);
//   const response = await axios.get(`https://pizza-house-jubayer44.vercel.app/api/orders`);
//   return {
//     props: {
//       products: res.data,
//       orders: response.data,
//     },
//   };
// }
