import { useAppContext } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { assets, dummyOrders } from "../../assets/assets";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 max-w-4xl rounded-md border border-gray-300 bg-white"
          >
            {/* Order Items */}
            <div className="flex gap-4">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="flex flex-col">
                {order.items.map((item, i) => (
                  <p key={i} className="font-medium">
                    {item.product.name}
                    <span className="text-primary"> x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* Total Amount */}
            <div className="text-lg font-medium text-black/70 self-center">
              {currency}
              {order.amount}
            </div>

            {/* Payment Info */}
            <div className="text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
