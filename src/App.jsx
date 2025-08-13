import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dob) {
      setMessage("Please select a date of birth.");
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age >= 18) {
      setMessage("✅ You are 18 or older. You can enter.");
    } else {
      setMessage("❌ You are under 18. Go watch pogo.");
    }
  };

  return (
    <div className="card">
      <h2>Age Validator</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select or enter DOB:</h3>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button type="submit">Click me to check!!</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
