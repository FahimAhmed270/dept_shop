import React from 'react'
import Hero from './Component/Hero'
import { useProductContext } from './Context/ProductContext';



const About = () => {
  // const {myName} = useProductContext()


  const data = {
    name: 'Fahim Store',
  }
  return (
  <>
 {/* { myName} */}
  <Hero myData={data} />
  </>
  )

}

export default About
