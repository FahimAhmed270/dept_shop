import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../Reducer/CartReducer'

const CartContext = createContext()

const getLocalcartData = () => {
    let localCartData = localStorage.getItem('productCart')

    // if (localCartData === []) {
    //     return []
    // } else {
    //     return JSON.parse(localCartData)
    // }

    const parseData = JSON.parse(localCartData)
    if(!Array.isArray(parseData)) return []

    return parseData
}
const initialState = {
    // cart: [],
    cart: getLocalcartData(),
    total_item: '',
    total_price: '',
    shipping_fee: 50000,
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { id, color, amount, product } })
    }

    //  to remove button item
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    }

    // to remove cart product

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    // to increasment & decrement product

    const setDecrease = (id) => {
        dispatch({ type: 'SET_DECREASE', payload: id })
    }

    const setIncrease = (id) => {
        dispatch({ type: 'SET_INCREASE', payload: id })
    }

    // to add the data in local storage

    useEffect(() => {
        dispatch({ type: 'TOTAL_CART_PROUCT' })
        dispatch({ type: 'TOTAL_CART_PRICE' })
        localStorage.setItem('productCart', JSON.stringify(state.cart))
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setIncrease, setDecrease }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}