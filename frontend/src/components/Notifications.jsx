import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลการแจ้งเตือนจาก API
    axios
      .get("http://localhost:5000/api/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const markAsSeen = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}`);
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <div>
      <h2>การแจ้งเตือน</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <p>{notification.message}</p>
            <button onClick={() => markAsSeen(notification.id)}>
              Mark as Seen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
