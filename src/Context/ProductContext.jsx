import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../Reducer/ProductReducer'
import SingleProduct from '../SingleProduct'

const AppContext = createContext()

const API = 'https://api.pujakaitem.com/api/products'

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct : {}
}

export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const getProducts = async (url) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await axios.get(url)
            const products = await res.data
            dispatch({ type: 'MY_PRODUCT', payload: products })
        } catch (error) {
            dispatch({ type: 'MY_ERROR' })
        }
    }

    // single product page

    const getSingleProduct = async (url) => {
        dispatch({ type: 'SET_SINGLE_LOADING' })
        try{
            const res = await axios.get(url)
            const singleProduct = await res.data
            dispatch({ type: 'SET_SINGLE_PRODUCT', payload: singleProduct })
        }catch(error){
            dispatch({ type: 'SET_SINGLE_ERROR' })
        }
    }

    useEffect(() => {
        getProducts(API)
    }, [])

    return <AppContext.Provider value={{ ...state, getSingleProduct }}>
        {children}
    </AppContext.Provider>
}

export const useProductContext = () => {
    return useContext(AppContext)
}