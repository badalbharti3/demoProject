import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      setMessage({ text: "Please select complete date of birth.", type: "error" });
      return;
    }

    const birthDate = new Date(year, months.indexOf(month), day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age >= 18) {
      setMessage({ text: "✅ You are 18 or older.", type: "success" });
    } else {
      setMessage({ text: "You are under 18.", type: "error" });
    }
  };

  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setMessage("");
  };

  return (
    <div className="card">
      <h2>Age Validator</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select your date of birth:</h3>
        <div className="date-inputs">
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            aria-label="Day"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            aria-label="Month"
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Year"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button type="submit">Check Age</button>
          {message && (
            <button type="button" onClick={handleReset} className="reset-button">
              Reset
            </button>
          )}
        </div>
      </form>
      {message && (
        <p className={`message ${message.type}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default App;
