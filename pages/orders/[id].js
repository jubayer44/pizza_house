import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

import styles from '../../styles/Order.module.css';
import Image from "next/image";



const OrderPage = () => {
const status = 0;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  }


    
  return (
    <div className="my-10 mx-2">
        <h1 className="text-4xl text-center font-bold mb-10">My Orders</h1>
    <div className="flex justify-between">
      <div className="w-[60%]">
        <div className="flex justify-between gap-10 items-center border-b-2 pb-4">
          <div>
            <p className="font-bold">Order ID</p>
            <p>312943780243</p>
          </div>
          <div>
            <p className="font-bold">Customer</p>
            <p>John</p>
          </div>
          <div>
            <p className="font-bold">Address</p>
            <p>ste 340 Ashburn, VA</p>
          </div>
          <div>
            <p className="font-bold">Total</p>
            <p>$50</p>
          </div>
        </div>
        
        <div className={`${styles.row} mt-24 mb-10`}>
          <div className={statusClass(0)}>
            <Image src="/Images/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
                <CheckCircleIcon className="w-6 h-6 text-green-500"/>
            </div>
          </div>
        <div className={statusClass(1)}>
            <Image src="/Images/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
            <CheckCircleIcon className="w-6 h-6 text-green-500"/>
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/Images/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
            <CheckCircleIcon className="w-6 h-6 text-green-500"/>
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/Images/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
            <CheckCircleIcon className="w-6 h-6 text-green-500"/>
            </div>
          </div>
          </div>





      </div>

      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">$129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">$134.98 USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <p className="text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Paid
          </p>
        </div>
    </div>
    </div>
  );
};

export default OrderPage;
