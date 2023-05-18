const cart = []


export const orderItemReducer = (state = cart, action) => {
    const singleProduct = action.payload
    switch (action.type) {
        case 'ADD_ORDERITEM_TO_CART': {

            const exist = state.find((x) => x.id === singleProduct.programId)
            if (exist) {
                return state.map((x) =>
                    x.id === singleProduct.programId ? { ...x, qty: x.qty + 1 } : x)
            } else {
                const singleProduct = action.payload
                return [
                    ...state,
                    {
                        ...singleProduct,
                        qty: 1,
                    }
                ]
            }
            break
        }
        case 'DELETE_ORDERITEM_FROM_CART': {

            const exist1 = state.find((x) => x.programId === singleProduct.programId)
            if (exist1.qty === 1) {
                return state.filter((x) =>
                    x.programId !== exist1.programId)
            } else {
                return state.map((x) =>
                    x.id === singleProduct.programId ? { ...x, qty: x.qty - 1 } : x)
            }
            break
        }

        case 'CLEAR_CART': {
            return []; 
          }

        default:
            return state;
            break

    }
}

const shippingInfo = {};


export const shippingReducer = (state = shippingInfo, action) => {
    switch (action.type) {
      case 'SAVE_SHIPPING_INFO':
        return action.payload;
      default:
        return state;
    }
  };




