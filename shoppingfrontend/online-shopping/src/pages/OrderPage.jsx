import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const OrderPage = ({ onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    user: "",
    product_id: "",
    address_id: "",
    payment_id: "",
    unit_price: "",
    number_of_items: "",
    offer: "",
    delivery_cost: "",
    delivery_date: "",
    order_date: "",
    status_id: "",
  });
  const [editingOrder, setEditingOrder] = useState(null);

  const baseURL = "http://localhost:5000/api/orders";
  const statusURL = "http://localhost:5000/api/orderstatus";
  const productURL = "http://localhost:5000/api/products";

  // Fetch orders, statuses, and products
  useEffect(() => {
    fetchOrders();
    fetchStatuses();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(baseURL);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(statusURL);
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(productURL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL, newOrder);
      fetchOrders();
      setNewOrder({
        user: "",
        product_id: "",
        address_id: "",
        payment_id: "",
        unit_price: "",
        number_of_items: "",
        offer: "",
        delivery_cost: "",
        delivery_date: "",
        order_date: "",
        status_id: "",
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder(order);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/${editingOrder.id}`, newOrder);
      fetchOrders();
      setEditingOrder(null);
      setNewOrder({
        user: "",
        product_id: "",
        address_id: "",
        payment_id: "",
        unit_price: "",
        number_of_items: "",
        offer: "",
        delivery_cost: "",
        delivery_date: "",
        order_date: "",
        status_id: "",
      });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getStatusName = (statusId) => {
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.status : "Unknown";
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown";
  };

  return (
    <>
      <Navbar onLogout={onLogout} />
      <div className="container mt-4">
        <h2 className="text-center mb-4 fw-bold">Order Management</h2>

        {/* Add / Edit Form */}
        <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">{editingOrder ? "Edit Order" : "Add Order"}</h5>
          <form onSubmit={editingOrder ? handleUpdateOrder : handleAddOrder}>
            <div className="row g-3">
              <div className="col-md-2">
                <input
                  type="text"
                  name="user"
                  placeholder="User"
                  value={newOrder.user}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Product Dropdown */}
              <div className="col-md-2">
                <select
                  name="product_id"
                  value={newOrder.product_id}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  name="address_id"
                  placeholder="Address ID"
                  value={newOrder.address_id}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  name="payment_id"
                  placeholder="Payment ID"
                  value={newOrder.payment_id}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  name="unit_price"
                  placeholder="Unit Price"
                  value={newOrder.unit_price}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  name="number_of_items"
                  placeholder="Items"
                  value={newOrder.number_of_items}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  name="offer"
                  placeholder="Offer"
                  value={newOrder.offer}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  name="delivery_cost"
                  placeholder="Delivery Cost"
                  value={newOrder.delivery_cost}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="date"
                  name="delivery_date"
                  value={newOrder.delivery_date}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <input
                  type="date"
                  name="order_date"
                  value={newOrder.order_date}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              {/* Status Dropdown */}
              <div className="col-md-2">
                <select
                  name="status_id"
                  value={newOrder.status_id}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <button
                  type="submit"
                  className={`btn ${editingOrder ? "btn-success" : "btn-primary"} w-100`}
                >
                  {editingOrder ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Orders Table */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Orders List</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-hover text-center align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Address</th>
                    <th>Payment</th>
                    <th>Unit Price</th>
                    <th>Items</th>
                    <th>Offer</th>
                    <th>Delivery Cost</th>
                    <th>Total Cost</th>
                    <th>Delivery Date</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="14" className="text-muted">
                        No orders available.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.user}</td>
                        <td>{getProductName(order.product_id)}</td>
                        <td>{order.address_id}</td>
                        <td>{order.payment_id}</td>
                        <td>{order.unit_price}</td>
                        <td>{order.number_of_items}</td>
                        <td>{order.offer}</td>
                        <td>{order.delivery_cost}</td>
                        <td>{order.total_cost}</td>
                        <td>{order.delivery_date}</td>
                        <td>{order.order_date}</td>
                        <td>{getStatusName(order.status_id)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-success me-2"
                            onClick={() => handleEditOrder(order)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
