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
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useOrders } from "../contexts/OrderProvider";
import OrderedItem from "../components/OrderedItems";

export default function Profile() {
  return (
    <section>
      <Outlet />
    </section>
  );
}

export function UserDetails() {
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
        userDetails: {
          ...prev.userDetails,
          addresses: [
            ...prev.userDetails.addresses,
            { id: uuid(), add: { ...addressInput } },
          ],
        },
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
      userDetails: {
        ...prev.userDetails,
        addresses: prev.userDetails.addresses.filter(({ id }) => id !== addId),
      },
    }));
  };

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddressInput((prev) => ({ ...prev, [name]: value }));
  };

  const logUserOut = () => {
    signOut();
    toast.success("Logged out!");
    cartDispatch({ type: "RESET_CART" });
    wishlistDispatch({ type: "RESET_WISHLIST" });
    navigate("/");
  };

  return (
    <section className="m-2 mx-auto w-[90vw] bg-white p-4 sm:max-w-[500px]">
      <div className="p- flex items-center gap-4 border-b-[1px] px-2 pb-4">
        <div className="rounded-full text-2xl uppercase text-black">
          <FontAwesomeIcon icon={faUserCircle} title="Login" />
        </div>
        <h1 className="text-lg uppercase">
          {user?.userDetails?.firstName} {user?.userDetails?.lastName}
        </h1>
      </div>
      <section className="mb-4 flex flex-col items-start gap-4 p-2">
        <h2>Saved Addresses</h2>
        {user?.userDetails?.addresses?.map((address) => (
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
      </section>
      <button
        onClick={() => navigate("/profile/order-history")}
        className="flex w-full items-center justify-between border-t-[1px] border-[#2C74B3]/20 p-2"
      >
        <h2>Order History</h2>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="border-t-[1px] pt-4">
        <button
          className="rounded-md border-[1px] border-[#2C74B3]/20 p-2 capitalize outline-none"
          onClick={logUserOut}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export function OrderHistory() {
  const navigate = useNavigate();
  const { orders } = useOrders();

  return (
    <section className="m-2 mx-auto w-[90vw] bg-white p-4 sm:max-w-[500px]">
      <button
        onClick={() => navigate("/profile")}
        className="w-full border-b-[1px] p-2 text-left"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <section>
        <h1 className="m-2 mb-4 text-lg uppercase">Order history</h1>
        {orders?.length > 0 ? (
          orders?.map((order) => {
            const { orderedItems, amount, address, paymentId } = order;
            return (
              <section className="flex w-full flex-wrap items-center gap-4 rounded-md border-[1px] p-2">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left capitalize">
                      <th className="border-[1px] p-1 pl-2">product details</th>
                      <th className="border-[1px] p-1 pl-2">qty</th>
                      <th className="border-[1px] p-1 pl-2">price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedItems?.map((item) => (
                      <OrderedItem key={item.id} {...item} />
                    ))}
                  </tbody>
                </table>
                <section className="text-sm">
                  <p>
                    <span className="font-bold">Payment ID:</span> {paymentId}
                  </p>
                  <p>
                    <span className="font-bold">Amount:</span> ₹{amount}
                  </p>
                  <p>
                    <span className="font-bold">Shipping Address:</span>{" "}
                    {address}
                  </p>
                </section>
              </section>
            );
          })
        ) : (
          <p className="p-2 capitalize text-gray-500">no order history</p>
        )}
      </section>
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
        userDetails: {
          ...prev.userDetails,
          addresses: prev.userDetails.addresses.map((el) =>
            el.id === id ? { ...el, add: addressInput } : el
          ),
        },
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
