import { v4 as uuid } from "uuid";
import { formatDate } from "../backend/utils/authUtils";

export const getUniqueElementArray = (arr, property) => {
  return arr.reduce(
    (acc, item) =>
      acc.includes(item[property]) ? acc : [...acc, item[property]],
    []
  );
};

export const getImgUrl = (category) => {
  switch (category) {
    case "shoes":
      return "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    case "clothing":
      return "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    case "accessories":
      return "https://images.pexels.com/photos/4019460/pexels-photo-4019460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    default:
      return "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }
};

export const getItemFromSessionStorage = (key) => {
  return sessionStorage.getItem(key);
};

export const setItemToSessionStorage = (key, value) => {
  return sessionStorage.setItem(key, value);
};

export const isEmptyObject = (obj) =>
  Object.values(obj).some((el) => el === "");

export const userFound = JSON.parse(getItemFromSessionStorage("user")) || {
  _id: uuid(),
  firstName: "Adarsh",
  lastName: "Balika",
  email: "adarshbalika@gmail.com",
  password: "adarshbalika",
  createdAt: formatDate(),
  updatedAt: formatDate(),
};
