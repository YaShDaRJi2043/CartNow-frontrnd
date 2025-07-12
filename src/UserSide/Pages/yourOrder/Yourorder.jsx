import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BASE_URL from "../../../services/Helper";
import "./YourOrder.css";

const YourOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      const response = await BASE_URL.get("/user/buy/get", {
        headers: {
          Authorization: userToken,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      processing: { class: "processing", text: "Processing" },
      shipped: { class: "shipped", text: "Shipped" },
      delivered: { class: "delivered", text: "Delivered" },
      cancelled: { class: "cancelled", text: "Cancelled" },
    };
    return (
      <span className={`status-badge ${statusMap[status]?.class || ""}`}>
        {statusMap[status]?.text || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="order-loading">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>Your Orders</h2>
        <div className="empty-orders">
          <img src="/images/empty-orders.svg" alt="No orders" />
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <div className="order-meta">
              <p className="order-date">
                Ordered on {formatDate(order.createdAt)}
              </p>
              <p className="order-id">Order # {order._id}</p>
            </div>
            <div className="order-status">
              {getStatusBadge(order.orderStatus)}
              <p className="delivery-estimate">
                Estimated delivery: 2-3 business days
              </p>
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-image">
                  <img src={item.product.url} alt={item.product.shortTitle} />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.product.shortTitle}</h3>
                  <p className="item-price">
                    ₹{item.product.mrp}{" "}
                    <span className="original-price">₹{item.product.cost}</span>
                    <span className="discount">
                      {" "}
                      ({item.product.discount} off)
                    </span>
                  </p>
                  <p className="item-quantity">
                    Quantity: {item.product.quantity || 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="delivery-address">
              <h4>Delivery Address</h4>
              <p>
                {order.deliveryAddress.house}, {order.deliveryAddress.area}
              </p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state}
              </p>
              <p>PIN: {order.deliveryAddress.pin}</p>
            </div>
            <div className="order-total">
              <h4>Order Summary</h4>
              <div className="total-row">
                <span>Items:</span>
                <span>₹{order.totalAmount - 40}</span>
              </div>
              <div className="total-row">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="payment-status">
                Payment Status: <span className="paid">Paid</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourOrder;
