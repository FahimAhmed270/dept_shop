const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }

    case 'MY_PRODUCT':
      const featureProduct = action.payload.filter((value) => {
        return (
          value.featured === true ||
          value.shipping === true
        )
      })
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureProduct
      }
    case 'MY_ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false,
      }
    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };


    default:
      return state

  }
}
export default ProductReducer