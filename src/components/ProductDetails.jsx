import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "./Container";
import Loader from "./Loader";
import { SubmitButton } from "./Buttons";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (loading)
    return (
      <Container className="py-16 flex justify-center">
        <Loader />
      </Container>
    );

  function handleSubmit(e) {
    e.preventDefault();
  }

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
            <SubmitButton>Add to Cart</SubmitButton>
          </div>
        </form>
      </div>
    </Container>
  );
}
