import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    cart: [],
    wishlist: [],
    addresses: [
      {
        id: "9eca6b55-b87c-445d-b71e-1b26de3f6b36",
        add: {
          line1: "Test Apartment , Test Nagar , Test Village",
          line2: "Test - East , Mumbai - 097",
          city: "Mumbai",
          zipcode: "400098",
          country: "India",
        },
      },
    ],
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
