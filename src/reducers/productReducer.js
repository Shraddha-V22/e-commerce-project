export const productReducer = (state, { type, payload }) => {
  let tempState = state;
  switch (type) {
    case "INITIALISED_DATA":
      tempState = {
        ...tempState,
        productsData: [...payload],
        productDefault: [...payload],
      };
      break;
    case "INITIALISED_CATEGORIES":
      tempState = {
        ...tempState,
        categories: [...payload],
      };
      break;
    case "CLEAR_FILTERS":
      tempState = {
        ...tempState,
        categories: [],
        search: "",
        category: [],
        price: 0,
        rating: 0,
        brands: [],
        materials: [],
        sort: "",
      };
      break;
    case "SEARCH":
      tempState = {
        ...tempState,
        search: payload,
      };
      break;
    case "CATEGORY_FILTER":
      console.log(payload);
      tempState = {
        ...tempState,
        category: payload.checked
          ? [...tempState.category, payload.name]
          : tempState.category.filter((el) => el !== payload.name),
      };
      break;
    case "PRICE_FILTER":
      tempState = {
        ...tempState,
        price: payload,
      };
      break;
    case "RATING_FILTER":
      tempState = {
        ...tempState,
        rating: payload,
      };
      break;
    case "BRANDS_FILTER":
      tempState = {
        ...tempState,
        brands: payload.checked
          ? [...tempState.brands, payload.name]
          : tempState.brands.filter((el) => el !== payload.name),
      };
      break;
    case "MATERIALS_FILTER":
      tempState = {
        ...tempState,
        materials: payload.checked
          ? [...tempState.materials, payload.name]
          : tempState.materials.filter((el) => el !== payload.name),
      };
      break;
    case "SORT":
      tempState = {
        ...tempState,
        sort: payload,
      };
      break;
    default:
      break;
  }

  if (tempState.search.length) {
    tempState = {
      ...tempState,
      productsData: tempState.productDefault.filter(({ product_name }) =>
        product_name.toLowerCase().includes(tempState.search.toLowerCase())
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productDefault,
    };
  }

  if (tempState.category.length) {
    tempState = {
      ...tempState,
      productsData: tempState.productsData.filter(({ category }) =>
        tempState.category.some((el) => el === category)
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productsData,
    };
  }

  if (tempState.price) {
    tempState = {
      ...tempState,
      productsData: tempState.productsData.filter(
        ({ price }) => Number(tempState.price) >= price
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productsData,
    };
  }

  if (tempState.brands.length) {
    tempState = {
      ...tempState,
      productsData: tempState.productsData.filter(({ brand }) =>
        tempState.brands.some((el) => el === brand)
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productsData,
    };
  }

  if (tempState.materials.length) {
    tempState = {
      ...tempState,
      productsData: tempState.productsData.filter(({ material }) =>
        tempState.materials.some((el) => el === material)
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productsData,
    };
  }

  if (tempState.rating) {
    tempState = {
      ...tempState,
      productsData: tempState.productsData.filter(
        ({ rating }) => Number(rating) >= tempState.rating
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productsData,
    };
  }

  if (tempState.sort !== "") {
    tempState = {
      ...tempState,
      productsData: [...tempState.productsData].sort((a, b) =>
        tempState.sort === "LTH" ? a.price - b.price : b.price - a.price
      ),
    };
  } else {
    tempState = {
      ...tempState,
      productsData: tempState.productsData,
    };
  }

  return tempState;
};
