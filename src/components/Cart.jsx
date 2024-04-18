import Container from "./Container";

import useTempStore from "../hooks/useTempStore";
import { useEffect } from "react";

export default function Cart() {
  const { cart, updateCart, removeFromCart, setCart } = useTempStore();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const loadedCart = JSON.parse(localStorage.getItem("cart"));
    if (loadedCart) setCart(loadedCart);
  }, [setCart]);

  return (
    <Container className="py-12">
      <h1 className="text-xl font-semibold">Your Cart 🛒</h1>
      {cart.length === 0 ? (
        <div className="mt-6">Your cart is empty 🙁</div>
      ) : (
        <>
          <div className="mt-12 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-rose-100 px-6 md:px-12 py-4 rounded-md flex justify-between items-center"
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
                      onChange={(e) =>
                        updateCart(item, parseInt(e.target.value))
                      }
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

            <div className="mt-5 text-right"></div>
          </div>
        </>
      )}
    </Container>
  );
}
