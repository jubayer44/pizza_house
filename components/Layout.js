import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
        <>
         <Navbar/>
         <div className='max-w-[1400px] mx-auto min-h-screen'>
         {children}    
        </div>   
         <Footer/>
        </>
    );
};

export default Layout;