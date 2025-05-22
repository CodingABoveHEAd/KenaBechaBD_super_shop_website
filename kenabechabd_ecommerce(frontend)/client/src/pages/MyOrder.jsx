import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrder = () => {
  const [myOrders, setmyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setmyOrders(dummyOrders);
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div>
      <div className="mt-16 pb-16">
        <p className="text-2xl font-medium uppercase">My orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg
        mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-grey">
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>
              Total Amount : {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item, index) => (
            <div key={index}>
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt="product_image"
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>
              <div>
                <p>quantity: {item.quantity||'1'}</p>
                <p>status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

              </div>
              <p className="text-primary font-semibold text-lg">
                Amount: {currency}{item.product.price * item.quantity}
              </p>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
