import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
import React from "react";
import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { DetailsInput } from "../components/DetailsInput";
import { isEmptyObject } from "../common/utils";
import { useAuth } from "../contexts/AuthProvider";

export default function Profile() {
  const { user } = useAuth();
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [addressInput, setAddressInput] = useState({
    line1: "",
    line2: "",
    city: "",
    zipcode: "",
    country: "",
  });
  // const user = JSON.parse(localStorage.getItem("user"));
  const [addresses, setAddresses] = useState([]);

  const addUserAddress = (type) => {
    if (type === "SAVE" && !isEmptyObject(addressInput)) {
      user.address = user.address
        ? [...user.address, { id: uuid(), add: { ...addressInput } }]
        : [{ id: uuid(), add: { ...addressInput } }];
      // localStorage.setItem("user", JSON.stringify(user));
      setAddresses(user.address);
      setShowAddressInput(false);
      setAddressInput({
        line1: "",
        line2: "",
        city: "",
        zipcode: "",
        country: "",
      });
    } else if (type === "CANCEL") {
      setAddressInput({
        line1: "",
        line2: "",
        city: "",
        zipcode: "",
        country: "",
      });
      setShowAddressInput(false);
    }
  };

  const deleteAddress = (addId) => {
    user.address = user.address.filter(({ id }) => id !== addId);
    localStorage.setItem("user", JSON.stringify(user));
    setAddresses(user.address);
  };

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddressInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="m-2 mx-auto max-w-[500px] bg-white p-4">
      <div className="p- flex items-center gap-4 border-b-[1px] px-2 pb-4">
        <div className="relative rounded-full text-2xl uppercase text-black">
          <FontAwesomeIcon icon={faUserCircle} title="Login" />
        </div>
        <h1 className="text-lg uppercase">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <div className="mb-4 flex flex-col items-start gap-4 p-2">
        <h2>Saved Addresses</h2>
        {addresses.map((el) => (
          <div
            key={el.id}
            className="flex items-center gap-4 rounded-md border-[1px] p-2"
          >
            <p>{Object.values(el.add).join(",")}.</p>
            <button onClick={() => deleteAddress(el.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        {showAddressInput && (
          <div className="flex w-full flex-col gap-4 rounded-md border-[1px] p-2">
            <article className="flex flex-col gap-4">
              <DetailsInput
                placeholder="Address Line 1*"
                name="line1"
                value={addressInput.line1}
                onChange={addressChangeHandler}
              />
              <DetailsInput
                placeholder="Address Line 2*"
                name="line2"
                value={addressInput.line2}
                onChange={addressChangeHandler}
              />
              <DetailsInput
                placeholder="City*"
                name="city"
                value={addressInput.city}
                onChange={addressChangeHandler}
              />
              <DetailsInput
                placeholder="Zip Code/Postal Code*"
                name="zipcode"
                value={addressInput.zipcode}
                onChange={addressChangeHandler}
              />
              <DetailsInput
                placeholder="Country*"
                name="country"
                value={addressInput.country}
                onChange={addressChangeHandler}
              />
            </article>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="border-[1px] p-1 capitalize"
                onClick={() => addUserAddress("SAVE")}
              >
                save
              </button>
              <button
                className="border-[1px] p-1 capitalize"
                onClick={() => addUserAddress("CANCEL")}
              >
                cancel
              </button>
            </div>
          </div>
        )}

        <button
          className="text-2xl"
          onClick={() => setShowAddressInput((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>
    </section>
  );
}
