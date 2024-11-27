import React, { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = { name, phone, email };

    try {
      await axios.post("http://localhost:5000/api/customers", customerData);
      alert("Customer added successfully");
    } catch (error) {
      alert("Error adding customer");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>เพิ่มชื่อลูกค้า</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
