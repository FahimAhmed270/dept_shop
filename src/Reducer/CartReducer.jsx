const CartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let { id, color, amount, product } = action.payload

            // handle the existing product
            let existingProduct = state.cart.find((currItem) => currItem.id === id + color)

            if (existingProduct) {
                let updateAmoumt = state.cart.map((value) => {
                    if (value.id === id + color) {
                        let newAmount = value.amount + amount

                        if (newAmount >= value.max) {
                            newAmount = value.max
                        }
                        return {
                            ...value,
                            amount: newAmount
                        }
                    } else {
                        return value
                    }
                })
                return {
                    ...state,
                    cart: updateAmoumt
                }
            }

            let cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock,
            }
            return {
                ...state,
                cart: [...state.cart, cartProduct]
            }


        case 'REMOVE_ITEM':
            let updateCart = state.cart.filter((item) => item.id !== action.payload)
            return {
                ...state,
                cart: updateCart,
            }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }

        // to increasment & decrement product

        case 'SET_DECREASE':
            let updateProduct = state.cart.map((currPro) => {
                if (currPro.id === action.payload) {
                    let decAmount = currPro.amount - 1

                    if (decAmount <= 1) {
                        decAmount = 1
                    }
                    return {
                        ...currPro,
                        amount: decAmount
                    }
                } else {
                    return currPro
                }
            })
            return {
                ...state,
                cart: updateProduct
            }

        case 'SET_INCREASE':

            let updateProducts = state.cart.map((currPro) => {
                if (currPro.id === action.payload) {

                    let incAmount = currPro.amount + 1

                    if (incAmount >= currPro.max) {
                        incAmount = currPro.max
                    }
                    return {
                        ...currPro,
                        amount: incAmount
                    }
                } else {
                    return currPro
                }
            })
            return {
                ...state,
                cart: updateProducts
            }

        case 'TOTAL_CART_PROUCT':
            let showProduct = state.cart.reduce((acc, value) => {
                let { amount } = value
                acc = acc + amount
                return acc
            }, 0)
            return {
                ...state,
                total_item: showProduct
            }

        case 'TOTAL_CART_PRICE':
            let totalPrice = state.cart.reduce((acc, curr) => {
                let { amount, price } = curr
                acc = acc + (amount * price)
                return acc
            }, 0)
            return {
                ...state,
                total_price: totalPrice,
            }

        default:
            return state
    }
}

export default CartReducer