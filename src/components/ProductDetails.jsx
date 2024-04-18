import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Container from "./Container";
import Loader from "./Loader";
import { SubmitButton } from "./Buttons";
import Error from "./Error";

import useUserStore from "../hooks/useUserStore";
import useTempStore from "../hooks/useTempStore";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const { user } = useUserStore();
  const { cart, updateCart } = useTempStore();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleSubmit() {
    if (user) {
      const existingProduct = cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: qty };
          }
          return item;
        });
      } else {
        // If the product doesn't exist in the cart, add it with the new quantity
        updatedCart = [...cart, { ...product, quantity: qty }];
      }

      // Send updated cart data to the backend
      axios
        .put(`http://localhost:3000/users/${user.id}`, {
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
      updateCart(product, qty);
    }
  }

  if (loading)
    return (
      <Container className="py-16 flex justify-center">
        <Loader />
      </Container>
    );

  if (error)
    return (
      <Container className="py-16 flex justify-center">
        <Error message={error.message} />
      </Container>
    );

  return (
    <Container className="py-16 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <img
          src={product.image}
          className="aspect-square rounded-md"
          alt={product.name + " image"}
        />
      </div>
      <div className="">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          {product.name}
        </h2>
        <p className="text-gray-600 md:text-lg">{product.description}</p>
        <p className="text-rose-500 my-5 font-semibold text-lg">
          Price: {formatter.format(product.price)}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center">
            <label>Quantity</label>
            <input
              type="number"
              value={qty}
              min={1}
              max={10}
              onChange={(e) => setQty(e.target.value)}
              className="rounded-full shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-20 sm:text-sm border-gray-300"
            />
          </div>
          <div className="mt-8">
            <SubmitButton disabled={cart.some((i) => i.id === product.id)}>
              {cart.some((i) => i.id === product.id)
                ? "Already in Cart"
                : "Add to Cart"}
            </SubmitButton>
          </div>
        </form>
      </div>
    </Container>
  );
}
