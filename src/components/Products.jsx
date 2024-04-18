import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

import Container from "./Container";
import { SecondaryButton } from "./Buttons";
import Loader from "./Loader";

export default function Products() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let filteredProducts;

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (products) {
    filteredProducts =
      category === "All"
        ? products
        : products.filter((p) => p.for === category);

    filteredProducts = filteredProducts.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (loading)
    return (
      <Container className="py-16 flex justify-center">
        <Loader />
      </Container>
    );

  return (
    <Container className="py-16">
      <div className="flex flex-col gap-6 justify-between items-start md:flex-row md:items-center">
        <h2 className="font-bold text-2xl">Welcome to FGC Hub</h2>

        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:ring-rose-500 focus:border-rose-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search products..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>

        <SecondaryButton>Logout</SecondaryButton>
      </div>

      <div>
        <div className="flex justify-between items-center mt-16">
          <div className="font-semibold text-lg">
            Showing {category} products
          </div>
          <div>
            <select
              id="category"
              name="category"
              value={category}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>PS5</option>
              <option>XBOX</option>
              <option>Switch</option>
              <option>PC</option>
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          {filteredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="p-6 bg-rose-100 h-full rounded-lg">
                <img
                  src={product.image}
                  className="aspect-square rounded-md"
                  alt={product.name + " image"}
                />
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="mt-1 text-rose-500 font-semibold">
                  {formatter.format(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
