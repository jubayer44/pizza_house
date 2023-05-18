import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({product}) => {
    return (
        <div className='my-10 hover:outline-double'>
            <div className='bg-white p-2 rounded-md shadow-xl'>
            <Image className='mx-auto w-[200px] h-[200px]' src={product?.img} alt='' width={200} height={200}/>
            <h2 className="text-xl font-bold text-center my-2">{product?.name}</h2>
            <h3 className="text-2xl  text-center text-pink-500 my-4">${product?.prices[0]}</h3>
            <p className='text-center'>{product?.des}</p>
            <div className='my-4 w-full flex justify-center'>
            <Link className='font-bold  bg-pink-500 p-2 rounded-md text-white' href={`product/${product?._id}`} passHref>Buy Now</Link>
            </div>
        </div>
        </div>
    );
};

export default ProductCard;