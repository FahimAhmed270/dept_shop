import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../styles/Button'

const Hero = ({myData}) => {
  const {name}= myData;
  return (
    <Wrapper>
        <div className="container">
            <div className="grid grid-two-column">
            <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1>{name} </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              atque temporibus veniam doloribus libero ad error omnis voluptates
              animi! Suscipit sapiente.
            </p>
            <NavLink>
                <Button>shop now</Button>
            </NavLink>
            </div>

            {/* our homepage image  */}

            <div className="hero-section-image">
              <figure>
                <img src="./images/hero.jpg" alt="hero-image"/>
              </figure>
            </div>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 12rem 0;
  img {
    width: 100%;
    height: auto;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
 
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 8rem 0px;
    
    .grid {
      gap: 12rem;
    }
  }
`;
export default Hero