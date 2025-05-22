import React from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFiltered(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFiltered(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="ml-27 w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
      gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filtered
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard
                key={index}
                Name={product.name}
                Category={product.category}
                Rating={product.rating}
                Image={product.image[0]}
                Price={product.price}
                OfferPrice={product.offerPrice}
                ID={product._id}
              />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
