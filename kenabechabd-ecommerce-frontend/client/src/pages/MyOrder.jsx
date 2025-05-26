import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        console.log(data.message);
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Processing":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-12 mt-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <div className="w-20 h-1 bg-primary mt-2 rounded-full"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-gray-500">No orders placed yet.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="mb-10 border border-gray-200 rounded-xl shadow-sm p-6 transition-all hover:shadow-md bg-white"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Order ID:</span> {order._id}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Payment:</span> {order.paymentType}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Total:</span> {currency}
                {order.amount}
              </p>
            </div>

            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col md:flex-row justify-between items-center border-t py-4 gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 border flex items-center justify-center">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="object-cover h-14 w-14"
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-800 font-semibold text-lg">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-500 capitalize">
                      Category: {item.product.category}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500 text-center md:text-left">
                  <p>Qty: {item.quantity || 1}</p>
                  <p>
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </p>
                </div>

                <div className="text-primary font-semibold text-lg">
                  {currency}
                  {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder;
