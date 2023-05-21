import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
import React from "react";
import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [addressText, setAddressText] = useState("");
  const userFound = JSON.parse(localStorage.getItem("user"));
  const [addresses, setAddresses] = useState(
    () => JSON.parse(localStorage.getItem("user"))?.address || []
  );

  const addUserAddress = () => {
    userFound.address = userFound.address
      ? [...userFound.address, { id: uuid(), add: addressText }]
      : [{ id: uuid(), add: addressText }];
    localStorage.setItem("user", JSON.stringify(userFound));
    setAddresses(userFound.address);
    setShowAddressInput(false);
  };

  const deleteAddress = (addId) => {
    userFound.address = userFound.address.filter(({ id }) => id !== addId);
    localStorage.setItem("user", JSON.stringify(userFound));
    setAddresses(userFound.address);
  };

  return (
    <section className="m-2 bg-white p-4">
      <div className="flex items-center gap-4 border-b-[1px] p-2">
        <div className="relative rounded-full border-[1px] p-1 px-2 text-xl uppercase">
          {userFound?.firstName.substr(0, 1)}
          {userFound?.lastName.substr(0, 1)}
        </div>
        <h1 className="text-lg uppercase">
          {userFound?.firstName} {userFound?.lastName}
        </h1>
      </div>
      <div className="flex flex-col items-start gap-4 p-2">
        <h2>Saved Addresses</h2>
        {showAddressInput && (
          <div className="flex w-full justify-between">
            <input
              type="text"
              className="border-[1px]"
              onChange={(e) => setAddressText(e.target.value)}
            />

            <button className="border-[1px] p-1" onClick={addUserAddress}>
              save
            </button>
          </div>
        )}
        {addresses.map((el) => (
          <div key={el.id} className="flex items-center gap-4">
            <p>{el.add}</p>
            <button onClick={() => deleteAddress(el.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
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
