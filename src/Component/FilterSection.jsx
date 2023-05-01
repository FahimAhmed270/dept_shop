import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../Context/FilterContext'
import {FaCheck} from 'react-icons/fa'
import FormatPrice from '../Helpers/FormatPrice'
import { Button } from '../Styles/Button'

const FilterSection = () => {
  const { filters: { text, category, color, price, maxPrice, minPrice }, updateFilter, all_products, clearFilters } = useFilterContext()

  // get unique data for each field

  const getData = (data, attr) => {
    let newVal = data.map((value) => {
      return value[attr]
    })
    if (attr === 'colors') {
      newVal = newVal.flat()
    }
    return (newVal = ['all', ...new Set(newVal)])

  }

  // we need unique data

  const categoryOnlyData = getData(all_products, 'category')
  const companyOnlyData = getData(all_products, 'company')
  const colorOnlyData = getData(all_products, 'colors')


  return (
    <Wrapper>
      {/* search filter section */}

      <div className="filter-search">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name='text' value={text} placeholder='Search' onChange={updateFilter} />
        </form>
      </div>

      {/* filter category */}

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryOnlyData.map((cateData, index) => {
            return <button className={cateData === category ? 'active' : ''} key={index} type='button' name='category' value={cateData} onClick={updateFilter}>
              {cateData}
            </button>
          })}
        </div>
      </div>

      {/* filter company */}

      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select name="company" id="company" onClick={updateFilter} className='filter-company--select'>
            {companyOnlyData.map((comData, index) => {
              return <option key={index} value={comData} name='company'>
                {comData}
              </option>
            })}
          </select>
        </form>
      </div>

      {/* filter color picker */}

      <div className="filter-colors--colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorOnlyData.map((colorData, index) => {
            if(colorData === 'all'){
              return (
                <button key={index} type='button' name='color'
                  className='color-all--style'
                  value={colorData} onClick={updateFilter}
                  >
                  All
                </button>
              )
            }
            return (
              <button key={index} type='button' name='color'
                style={{ backgroundColor: colorData}}
                value={colorData} onClick={updateFilter}
                className={color === colorData ? 'btnStyle active' : 'btnStyle'}
              >
                {color === colorData ? <FaCheck className='checkStyle'/> : null}
              </button>
            )
          })}
        </div>
      </div>

      {/* price filter range */}

      <div className="filter_price">
        <h3>Price</h3>
        <p><FormatPrice price={price}/></p>
        <input type="range" name="price" value={price} min={minPrice} max={maxPrice} onChange={updateFilter} />
      </div>

       {/* clear all filter */}
       <div className="filter-clear">
        <Button className='btn' onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #fff;
  }
`;
export default FilterSection
