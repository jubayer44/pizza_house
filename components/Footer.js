import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-pink-600 text-white">
      <div className="mx-auto flex gap-10 justify-between mr-4">
        <div>
          <Image className="w-[500px] h-full" src="/Images/bg.png" alt="" width={20} height={20}/>
        </div>
        <div className="my-auto">
          <h2 className="text-3xl font-bold uppercase">oh yes, we did. <br /> the pizza house, <br /> well baked slice of pizza</h2>
        </div>
        <div>
          <div className="py-4">
          <h2 className="text-2xl font-bold text-yellow-300">FIND OUR RESTAURANTS</h2>
          <p className="my-3">1542 R. Don Road #304. <br /> NewYork, 85022 <br />(254) 524-6546</p>
          </div>
          <div>
          <p className="my-3">1542 R. Don Road #304. <br /> NewYork, 85022 <br />(254) 524-6546</p>
          </div>
          <div>
          <p className="my-3">1542 R. Don Road #304. <br /> NewYork, 85022 <br />(254) 524-6546</p>
          </div>
          <div>
          <p className="my-3">1542 R. Don Road #304. <br /> NewYork, 85022 <br />(254) 524-6546</p>
          </div>
        </div>
        <div className="py-4">
          <h3 className="text-2xl font-bold text-yellow-300">WORKING HOURS</h3>
          <p className="my-3">MONDAY UNTIL FRIDAY <br /> 9:00 - 22:00</p>
          <p className="my-3">SATURDAY UNTIL SUNDAY <br /> 9:00 - 22:00</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
