import ProductCard from './ProductCard';

const ProductList = ({allProducts}) => {

    return (
        <div className='my-10 mx-2'>
            <h1 className='text-4xl font-bold text-center my-4'>Best Pizza in Town</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel accusamus recusandae beatae cum soluta voluptatum, quia consequuntur aut doloremque alias impedit itaque quo omnis voluptas nisi nesciunt? Cumque, nemo minus.</p>
            <div className='grid grid-cols-4 justify-between gap-5'>
                {
                    allProducts?.map(product => 
                       <ProductCard key={product?._id} product={product}/>
                    )
                }
            </div>
        </div>
    );
};


    export default ProductList;