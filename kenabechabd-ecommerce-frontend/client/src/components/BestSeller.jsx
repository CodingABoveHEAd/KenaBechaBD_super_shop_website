import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

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
  const {products}=useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
       gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((dp, index) => (
              <ProductCard
                key={index}
                Name={dp.name}
                Category={dp.category}
                Rating={4}
                Image={dp.image[0]}
                Price={dp.price}
                OfferPrice={dp.offerPrice}
                ID={dp._id}
              />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
