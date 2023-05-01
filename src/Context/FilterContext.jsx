import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from '../Reducer/FilterReducer'

const FilterContext = createContext()
const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: 'lowest',
    filters: {
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        maxPrice: 0,
        price: 0,
        minPrice: 0,

    }
}

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext()

    const [state, dispatch] = useReducer(reducer, initialState)

    // grid view section

    const setGridView = () => {
        dispatch({ type: 'SET_GRID_VIEW' })
    }

    // List view section

    const setListView = () => {
        dispatch({ type: 'SET_LIST_VIEW' })
    }

    // sorting function

    const sorting = (e) => {
        const userValue = e.target.value
        dispatch({ type: 'GET_SORT_VALUE', payload: userValue })
    }

    // update the filter value

    const updateFilter = (e) => {
        let name = e.target.name
        let value = e.target.value

        return dispatch({ type: 'UPDATE_FILTER_VALUE', payload: { name, value } })
    }

    // clear all filter

    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTER' })
    }

    // to sort the product value

    useEffect(() => {
        dispatch({ type: 'FILTER_PRODUCT' })
        dispatch({ type: 'SORTING_PRODUCT' })
    }, [products, state.sorting_value, state.filters])

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products })
    }, [products])

    return <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilter, clearFilters }}>
        {children}
    </FilterContext.Provider>
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}