import React from 'react'
import Navbar from './navbar'
import { Helmet } from "react-helmet";
import { useGlobalContext } from '../context/context';

const Layout = ({children,title,description,keywords,author}) => {
  
  const {auth} = useGlobalContext()

  return (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <title>{title}</title>
        </Helmet>
        {auth?.token && <Navbar />}
        
        <main style={{ minHeight: "70vh" }}>
            {children}
        </main>
    </div>
  )
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Techinfoyt",
};
  
export default Layout
