import React from "react";
import AddCustomer from "./components/AddCustomer";
import AddFollowUp from "./components/AddFollowUp";
import FollowUpList from "./components/FollowUpList";
import Notifications from "./components/Notifications";

const App = () => {
  return (
    <div className="app-container">
      <h1>Debt Tracking System</h1>
      <Notifications />
      <AddCustomer />
      <AddFollowUp />
      <FollowUpList />
    </div>
  );
};

export default App;
