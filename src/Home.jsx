import React from 'react'
import FeatureProduct from './Component/FeatureProduct';
import Hero from './Component/Hero';
import Services from './Component/Services';
import Trusted from './Component/Trusted';

const Home = () => {
  const myData = {
    name: 'Ecommerce Store'
  }
  return (
    <>
      <Hero myData={myData}/>
      <FeatureProduct/>
      <Services/>
      <Trusted/>
    </>
  )
}


export default Home
