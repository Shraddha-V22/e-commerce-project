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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, signOut } = useAuth();
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [addressInput, setAddressInput] = useState({
    line1: "",
    line2: "",
    city: "",
    zipcode: "",
    country: "",
  });

  const saveAddress = () => {
    if (!isEmptyObject(addressInput)) {
      setUser((prev) => ({
        ...prev,
        addresses: [
          ...prev.addresses,
          { id: uuid(), add: { ...addressInput } },
        ],
      }));
      setShowAddressInput(false);
      setAddressInput({
        line1: "",
        line2: "",
        city: "",
        zipcode: "",
        country: "",
      });
    }
  };

  const cancelAction = () => {
    setAddressInput({
      line1: "",
      line2: "",
      city: "",
      zipcode: "",
      country: "",
    });
    setShowAddressInput(false);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const deleteAddress = (addId) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter(({ id }) => id !== addId),
    }));
  };

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddressInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="m-2 mx-auto w-[90vw] bg-white p-4 sm:max-w-[500px]">
      <div className="p- flex items-center gap-4 border-b-[1px] px-2 pb-4">
        <div className="rounded-full text-2xl uppercase text-black">
          <FontAwesomeIcon icon={faUserCircle} title="Login" />
        </div>
        <h1 className="text-lg uppercase">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <div className="mb-4 flex flex-col items-start gap-4 p-2">
        <h2>Saved Addresses</h2>
        {user.addresses.map((address) => (
          <AddressComp
            key={address.id}
            address={address}
            deleteAddress={deleteAddress}
            addressInput={addressInput}
            setAddressInput={setAddressInput}
            changeHandler={addressChangeHandler}
          />
        ))}
        {showAddressInput && (
          <AddressInputsComp
            addressInput={addressInput}
            changeHandler={addressChangeHandler}
            saveAddress={saveAddress}
            cancelAction={cancelAction}
          />
        )}
        <button
          className="text-2xl"
          onClick={() => setShowAddressInput((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faCirclePlus} title={"Add new address"} />
        </button>
      </div>
      <div className="border-t-[1px] pt-4">
        <button
          className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 capitalize outline-none"
          onClick={() => {
            signOut();
            toast.success("Logged out!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

function AddressComp({
  address,
  deleteAddress,
  addressInput,
  setAddressInput,
  changeHandler,
}) {
  const [showEditInput, setShowEditInput] = useState(false);
  const { setUser } = useAuth();

  const editAddress = () => {
    setShowEditInput((prev) => !prev);
    setAddressInput(address.add);
  };

  const saveAddress = (id) => {
    if (!isEmptyObject(addressInput)) {
      setUser((prev) => ({
        ...prev,
        addresses: prev.addresses.map((el) =>
          el.id === id ? { ...el, add: addressInput } : el
        ),
      }));
      setShowEditInput(false);
      setAddressInput({
        line1: "",
        line2: "",
        city: "",
        zipcode: "",
        country: "",
      });
    }
  };

  const cancelAction = () => {
    setAddressInput({
      line1: "",
      line2: "",
      city: "",
      zipcode: "",
      country: "",
    });
    setShowEditInput(false);
  };

  return !showEditInput ? (
    <div
      key={address.id}
      className="flex w-full flex-wrap items-center gap-4 rounded-md border-[1px] p-2"
    >
      <p>{Object.values(address.add).join(",")}.</p>
      <div className="flex gap-4">
        <button onClick={() => editAddress()} className="">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button onClick={() => deleteAddress(address.id)} className="">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ) : (
    <AddressInputsComp
      addressInput={addressInput}
      changeHandler={changeHandler}
      saveAddress={() => saveAddress(address.id)}
      cancelAction={cancelAction}
    />
  );
}

function AddressInputsComp({
  addressInput,
  changeHandler,
  saveAddress,
  cancelAction,
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border-[1px] p-2">
      <article className="flex flex-col gap-4">
        <DetailsInput
          placeholder="Address Line 1*"
          name="line1"
          value={addressInput.line1}
          onChange={changeHandler}
        />
        <DetailsInput
          placeholder="Address Line 2*"
          name="line2"
          value={addressInput.line2}
          onChange={changeHandler}
        />
        <DetailsInput
          placeholder="City*"
          name="city"
          value={addressInput.city}
          onChange={changeHandler}
        />
        <DetailsInput
          placeholder="Zip Code/Postal Code*"
          name="zipcode"
          value={addressInput.zipcode}
          onChange={changeHandler}
        />
        <DetailsInput
          placeholder="Country*"
          name="country"
          value={addressInput.country}
          onChange={changeHandler}
        />
      </article>
      <div className="grid grid-cols-2 gap-2">
        <button className="border-[1px] p-1 capitalize" onClick={saveAddress}>
          save
        </button>
        <button className="border-[1px] p-1 capitalize" onClick={cancelAction}>
          cancel
        </button>
      </div>
    </div>
  );
}
