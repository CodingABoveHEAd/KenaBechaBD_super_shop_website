import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductsCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );
 
  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === category
  );
  
  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
      gap-3 md:gap-6 lg:grid-cols-5 mt-6"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
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
          ))
        ) : (
          <p className="text-2xl">No items in this category</p>
        )}
      </div>
    </div>
  );
};

export default ProductsCategory;
