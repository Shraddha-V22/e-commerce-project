export const checkoutReducer = (state, { type, payload }) => {
  let tempState = state;
  switch (type) {
    case "ADDRESS_CHANGE":
      tempState = {
        ...tempState,
        addressInput: {
          ...tempState.addressInput,
          [payload.name]: payload.value,
        },
      };
      break;
    case "PAYMENT_DETAILS_CHANGE":
      tempState = {
        ...tempState,
        paymentDetails: {
          ...tempState.paymentDetails,
          [payload.name]: payload.value,
        },
      };
      break;
    case "UPDATE_INDEX":
      tempState = {
        ...tempState,
        elIndex: tempState.elIndex === 2 ? 0 : tempState.elIndex + 1,
      };
      break;
    case "SELECT_ADDRESS":
      tempState = {
        ...tempState,
        shippingAdd: payload.add,
        addressInput: { ...payload.addInput },
      };
      break;
    default:
      break;
  }
  return tempState;
};
