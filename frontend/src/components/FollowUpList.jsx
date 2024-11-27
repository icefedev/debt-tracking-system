import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowUpList = () => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    // เรียก API เพื่อดึงข้อมูล Follow-up
    axios
      .get("http://localhost:5000/api/followups")
      .then((response) => {
        setFollowUps(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the follow-ups!", error);
      });
  }, []);

  return (
    <div>
      <h2>รายชื่อลูกค้า</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Details</th>
            <th>Next Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map((followUp) => (
            <tr key={followUp.id}>
              <td>{followUp.customer.name}</td>
              <td>{new Date(followUp.date).toLocaleString()}</td>
              <td>{followUp.details}</td>
              <td>{new Date(followUp.nextFollowUp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FollowUpList;
