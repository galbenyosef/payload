'use client'
import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { useAuth } from '../providers/auth'
import Loader from '../Components/Loader'
const DefalultLayout = ({ children }) => {
  const { loading } = useAuth()

  return (
    <div className="main-page-area">
      <Header isTopBar={true}></Header>
      {true && <Loader />}
      {children}
      <Footer></Footer>
    </div>
  )
}

export default DefalultLayout
