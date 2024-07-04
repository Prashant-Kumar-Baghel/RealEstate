import React from 'react'
import Header from './Header'
import Breadcrumb from './Breadcrumb'
import LoginForm from './LoginForm'
import Footer from './Footer'
const Login = () => {
  return (
    <div>
      <Header/>
       {/* BreadCrumb */}
       <Breadcrumb
                pageTitle="Login"
                pageName="Login"
         />

         <LoginForm/>

         <Footer/>

     
    </div>
  )
}

export default Login
