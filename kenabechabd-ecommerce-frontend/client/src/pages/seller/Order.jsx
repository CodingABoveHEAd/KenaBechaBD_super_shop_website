import { useAppContext } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios, seller } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        console.log(data.orders);
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (seller) fetchOrders();
  }, [seller]);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-gray-200 bg-white shadow hover:shadow-md transition-shadow duration-200"
          >
            {/* Order Items */}
            <div className="flex flex-col gap-4 items-start">
              <img
                className="w-14 h-14 object-cover"
                src={assets.box_icon}
                alt="Order Icon"
              />
              <div className=" space-y-1">
                {order.items.map((item, i) => (
                  <p key={i} className=" font-medium  text-gray-800">
                    {item.product.name}
                    <span className="text-primary font-semibold">
                      {" "}
                      × {item.quantity}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="font-semibold text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p className="text-xs mt-1">📞 {order.address.phone}</p>
            </div>

            {/* Amount */}
            <div className="self-center text-center">
              <p className="text-base font-medium text-gray-700">Total</p>
              <p className="text-xl font-semibold text-gray-900">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* Payment Info */}
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Method:{" "}
                <span className="font-medium text-gray-800">
                  {order.paymentType}
                </span>
              </p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                Payment:{" "}
                <span
                  className={`font-semibold ${
                    order.isPaid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Status: {order.status}
              </p>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500 pt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
