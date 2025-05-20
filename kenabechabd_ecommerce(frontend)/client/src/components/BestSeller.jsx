import React from "react";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../assets/assets";

//   {
//     _id: "gd46g23h",
//     name: "Potato 500g",
//     category: "Vegetables",
//     price: 25,
//     offerPrice: 20,
//     image: [potato_image_1, potato_image_2, potato_image_3, potato_image_4],
//     description: [
//       "Fresh and organic",
//       "Rich in carbohydrates",
//       "Ideal for curries and fries",
//     ],
//     createdAt: "2025-03-25T07:17:46.018Z",
//     updatedAt: "2025-03-25T07:18:13.103Z",
//     inStock: true,
//   },

const BestSeller = () => {
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      {dummyProducts.map((dp, index) => (
        <div key={index}>
          <ProductCard Name={dp.name} Category={dp.category} Rating={dp.rating}
          Image={dp.image[0]} Price={dp.price} OfferPrice={dp.offerPrice}
          />
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
