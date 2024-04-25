import { useEffect, useState } from "react";

import Container from "./Container";
import { SecondaryButton } from "./Buttons";

import useTempStore from "../hooks/useTempStore";
import useUserStore from "../hooks/useUserStore";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart: localCart,
    updateCart,
    removeFromCart,
    setCart: setLocalCart,
  } = useTempStore();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      axios.get(`https://json-server-t23y.onrender.com/users/${user.id}`).then((res) => {
        const user = res.data;
        setCart(user.cart);
        setLoading(false);
      });
    } else if (localCart) {
      setCart(localCart);
      setLoading(false);
    }
  }, [localCart, user]);

  useEffect(() => {
    const loadedCart = JSON.parse(localStorage.getItem("cart"));
    if (loadedCart) setLocalCart(loadedCart);
  }, [setLocalCart]);

  if (loading)
    return (
      <Container className="py-16 flex justify-center">
        <Loader />
      </Container>
    );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function handleOrder() {
    if (user && cart.length > 0) {
      const items = cart.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      }));

      const newOrder = {
        date: new Date().toISOString(),
        items: items,
      };

      const updatedOrders = [...user.orders, newOrder];

      // Update user data on the backend
      axios
        .put(`https://json-server-t23y.onrender.com/users/${user.id}`, {
          ...user,
          cart: [],
          orders: updatedOrders,
        })
        .then((response) => {
          console.log(
            "User data updated successfully on the backend:",
            response.data
          );
          setCart([]);
          navigate("/orders");
        })
        .catch((error) => {
          console.error("Error updating user data on the backend:", error);
        });
    }
  }

  function handleChange(e, product) {
    const newQuantity = parseInt(e.target.value);

    if (user) {
      const existingProduct = cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      } else {
        // If the product doesn't exist in the cart, add it with the new quantity
        updatedCart = [...cart, { ...product, quantity: newQuantity }];
      }

      // Update the cart in the frontend
      setCart(updatedCart);

      // Send updated cart data to the backend
      axios
        .put(`https://json-server-t23y.onrender.com/users/${user.id}`, {
          ...user,
          cart: updatedCart,
        })
        .then((response) => {
          console.log(
            "Cart updated successfully on the backend:",
            response.data
          );
        })
        .catch((error) => {
          console.error("Error updating cart on the backend:", error);
        });
    } else {
      // If no user is logged in, update the temporary cart
      updateCart(product, newQuantity);
    }
  }

  return (
    <Container className="py-16">
      <h1 className="text-xl font-semibold">Your Cart 🛒</h1>
      {cart.length === 0 ? (
        <div className="mt-6">Your cart is empty 🙁</div>
      ) : (
        <>
          <div className="mt-12 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-rose-100 px-6 md:px-12 py-4 rounded-md flex flex-col md:flex-row justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    className="w-24 h-24 rounded-lg"
                    alt={item.name + " image"}
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-600">
                      Unit price: {formatter.format(item.price)}
                    </p>
                  </div>
                </div>
                <form>
                  <div className="flex gap-3 items-center">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={10}
                      onChange={(e) => handleChange(e, item)}
                      className="rounded-full shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-20 sm:text-sm border-gray-300"
                    />
                  </div>
                </form>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
                <div className="flex flex-col md:flex-row gap-x-12 gap-y-2">
                  <p className="font-medium rounded">
                    Total: {formatter.format(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-12 border-slate-400">
            <p className="mt-4 px-6 md:px-12 text-lg font-semibold flex justify-between">
              Grand total:{" "}
              <span>
                {formatter.format(
                  cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )
                )}
              </span>
            </p>

            {user && (
              <div className="mt-8" onClick={handleOrder}>
                <SecondaryButton>Order now</SecondaryButton>
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
