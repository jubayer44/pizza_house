import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
  "/Images/banner!.png",
  "/Images/banner2.png",
  "/Images/banner3.png",
];


const Banner = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleArrow = (dir) => {
      if (dir === 'L') {
          setSlideIndex(slideIndex === 0 ? images.length - 1 : slideIndex - 1);
      }
      if (dir === 'R') {
          setSlideIndex(slideIndex === images.length - 1 ? 0 : slideIndex + 1);
      }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setSlideIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Time delay in milliseconds
    
    return () => clearInterval(interval);
  }, [slideIndex]);


  return (
    <div className="relative  overflow-hidden">
      <Image
      onClick={()=> handleArrow("L")}
        className="w-20 h-20 absolute top-[40%] cursor-pointer hover:bg-red-500 rounded-md z-10"
        width={400}
        height={400}
        src="/Images/arrowl.png"
        alt=""
      />
      <div>
        <div className="w-[300vw] flex transition-all duration-1000 ease-in-out" style={{transform: `translateX(${-100*slideIndex}vw)`}}>
          {images.map((img, i) => (
            <div key={i}>
              <Image className="cursor-pointer w-[100vw] h-[80vh]" src={img} alt="" width={500} height={500} />
            </div>
          ))}
        </div>
      </div>
      <Image
      onClick={()=> handleArrow("R")}
        className="w-20 h-20 absolute top-[40%] cursor-pointer hover:bg-red-500 right-0 rounded-md z-10"
        width={400}
        height={400}
        src="/Images/arrowr.png"
        alt=""
      />
    </div>
  );
};

export default Banner;
