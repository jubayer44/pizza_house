import { useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddNewProduct = ({ isOpen, setIsOpen }) => {
  const [productName, setProductName] = useState(null);
  const [image, setImage] = useState(null);
  const [des, setDes] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const queryClient = useQueryClient();

  const createProduct = async (newProductData) => {
    const res = await axios.post(
      `https://pizza-house-jubayer44.vercel.app/api/products`,
      newProductData
    );
    toast.success("Product Successfully Added");
    setIsOpen(false);
  };

  const handlePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtra = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleAddExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uploads");

    try {
      const imgRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqke2ei62/image/upload",
        data
      );
      const url = imgRes?.data?.url;

      const newProduct = {
        name: productName,
        des,
        img: url,
        prices,
        extraOptions,
      };

      await createProduct(newProduct); // Make the API call to create the product

      await queryClient.invalidateQueries("products");

      queryClient.refetchQueries("products");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`absolute w-full min-h-screen ${isOpen ? "block" : "hidden"}`}
      style={{ backgroundColor: "rgba(212, 212, 212, 0.712)" }}
    >
      <div className="container mx-auto">
        <div className="flex justify-center my-12">
          <div className="w-full flex">
            <div className="w-full bg-white p-5 rounded-lg lg:rounded-md max-w-2xl mx-auto relative">
              <span
                onClick={() => setIsOpen(false)}
                className="pb-1 px-3 flex justify-center items-center bg-red-500 cursor-pointer text-white font-bold text-xl rounded-full absolute -top-2 -right-2"
              >
                x
              </span>
              <h3 className="pt-4 text-2xl text-center">Add a Product</h3>
              <div className="px-8 pt-6 bg-white rounded">
                <div className="mb-4 ">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      Product Name
                    </label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Product Image
                    </label>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      className="w-full px-3 py-2"
                      id="image"
                      type="file"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Price
                  </label>
                  <div className="flex justify-between gap-10">
                    <input
                      onChange={(e) => handlePrice(e, 0)}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow outline-none"
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Small Price"
                    />
                    <input
                      onChange={(e) => handlePrice(e, 1)}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow outline-none"
                      id="price"
                      type="number"
                      placeholder="Medium Price"
                    />
                    <input
                      onChange={(e) => handlePrice(e, 2)}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow outline-none"
                      id="price"
                      type="number"
                      placeholder="Large Price"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Product Description
                  </label>
                  <textarea
                    onChange={(e) => setDes(e.target.value)}
                    className="w-full outline-none border"
                    name="description"
                    id=""
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Extras
                    </label>
                    <div className="flex justify-between gap-10">
                      <input
                        onChange={(e) => handleExtra(e)}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="extras"
                        name="text"
                        type="text"
                        placeholder="Item Name"
                      />
                      <input
                        onChange={(e) => handleExtra(e)}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="Price"
                        name="price"
                        type="number"
                        placeholder="Item Price"
                      />
                      <button
                        onClick={handleAddExtra}
                        className="bg-gray-200 font-bold text-center px-6 text-xs rounded-md h-10"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {extraOptions?.map((ext, i) => (
                    <span
                      key={i}
                      className="text-xs py-2 border rounded-md px-2 bg-gray-100"
                    >
                      {ext.text}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleCreate}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Create
                  </button>
                </div>
                <hr className="mb-6 border-t" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
