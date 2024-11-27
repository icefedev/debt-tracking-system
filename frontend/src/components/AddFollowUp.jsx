import React, { useState, useEffect } from "react";
import axios from "axios";

const AddFollowUp = () => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [details, setDetails] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");

  useEffect(() => {
    // ดึงข้อมูลลูกค้าทั้งหมด
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const followUpData = {
      customerId,
      date: followupDate,
      details,
      nextFollowUp,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/followups",
        followUpData
      );
      console.log("Follow-up added:", response.data);
      alert("Follow-up added successfully");
    } catch (error) {
      alert("Error adding follow-up");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>การติดตาม</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={followupDate}
          onChange={(e) => setFollowupDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="date"
          value={nextFollowUp}
          onChange={(e) => setNextFollowUp(e.target.value)}
          required
        />
        <button type="submit">Add Follow-up</button>
      </form>
    </div>
  );
};

export default AddFollowUp;
