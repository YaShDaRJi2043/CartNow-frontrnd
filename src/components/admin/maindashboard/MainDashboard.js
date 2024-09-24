import React, { useState, useEffect } from "react";
import "./MainDashboard.css";
import CountUp from "react-countup";
import AdminVerticalHeader from "../../headers/AdminVerticalHeader";

const MainDashboard = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDaySale, setSelectedDaySale] = useState(0);
  const [showThisWeek, setShowThisWeek] = useState(true);
  const [monthSale, setMonthSale] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [yearSale, setYearSale] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setSelectedDay(new Date().toLocaleString("en-us", { weekday: "long" }));
      setMonthSale(25000);
      setYearSale(125000);
    }, 1000);
  }, []);

  useEffect(() => {
    // Simulating API calls to fetch the sales data for the selected day
    // You can replace this with actual API calls in your application
    fetchSalesForSelectedDay(selectedDay);
  }, [selectedDay]);

  const fetchSalesForSelectedDay = (day) => {
    // Simulating API call to fetch sales data for the selected day
    // Replace this with actual API call in your application
    const salesData = {
      Sunday: 100,
      Monday: 150,
      Tuesday: 200,
      Wednesday: 180,
      Thursday: 160,
      Friday: 220,
      Saturday: 120,
    };
    setSelectedDaySale(salesData[day] || 0);
  };

  const handleDaySelect = (event) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
  };

  const getPreviousAndCurrentDays = () => {
    const today = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDayIndex = today.getDay();
    const previousDays = daysOfWeek.slice(0, currentDayIndex);

    return [...previousDays, daysOfWeek[currentDayIndex]];
  };

  const dynamicDayOptions = getPreviousAndCurrentDays();

  // week

  const thisWeekSale = 100;
  const prevWeekSale = 75;

  const handleButtonClick = () => {
    setShowThisWeek((prevState) => !prevState);
  };

  // month

  const monthNames = [
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

  useEffect(() => {
    // Simulating API calls to fetch the sales data for the selected month
    // You can replace this with actual API calls in your application
    fetchSalesForSelectedMonth(selectedMonth);
  }, [selectedMonth]);

  const fetchSalesForSelectedMonth = (monthIndex) => {
    // Simulating API call to fetch sales data for the selected month
    // Replace this with actual API call in your application
    const salesData = {
      0: 8000,
      1: 9000,
      2: 10000,
      3: 11000,
      4: 12000,
      5: 13000,
      6: 14000,
      7: 15000,
      8: 16000,
      9: 17000,
      10: 18000,
      11: 19000,
    };
    setMonthSale(salesData[monthIndex] || 0);
  };

  const handleMonthSelect = (event) => {
    const selectedMonthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(selectedMonthIndex);
  };

  // Function to get the months from the current month index
  const getPreviousMonths = () => {
    const currentMonthIndex = new Date().getMonth();
    return monthNames.slice(0, currentMonthIndex + 1);
  };

  const dynamicMonthOptions = getPreviousMonths();

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <AdminVerticalHeader />
        </div>

        <div className="dashboard">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="sales">
            {/* day */}
            <div className="sale-card">
              <div className="dropdown">
                <select
                  className="dropdown-select"
                  value={selectedDay}
                  onChange={handleDaySelect}
                >
                  {dynamicDayOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <h2 className="h2Title">
                {selectedDay ===
                new Date().toLocaleString("en-us", { weekday: "long" })
                  ? "Today's Sale"
                  : `${selectedDay}'s Sale`}
              </h2>
              <div className="sale-number">
                <CountUp end={selectedDaySale} duration={2} />
              </div>
            </div>

            {/* week */}
            <div className="sale-card">
              <h2 className="h2Title">
                {showThisWeek ? "This Week's Sale" : "Previous Week's Sale"}
              </h2>
              <div className="sale-number">
                <CountUp
                  end={showThisWeek ? thisWeekSale : prevWeekSale}
                  duration={2}
                />
              </div>
              <button className="action-button" onClick={handleButtonClick}>
                {showThisWeek
                  ? "Show Previous Week Sale"
                  : "Show This Week Sale"}
              </button>
            </div>

            {/* month */}
            <div className="sale-card">
              <div className="dropdown">
                <select
                  className="dropdown-select"
                  value={selectedMonth}
                  onChange={handleMonthSelect}
                >
                  {dynamicMonthOptions.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <h2 className="h2Title">
                {selectedMonth === new Date().getMonth()
                  ? "This Month's Sale"
                  : `${monthNames[selectedMonth]}'s Sale`}
              </h2>
              <div className="sale-number">
                <CountUp end={monthSale} duration={2} />
              </div>
            </div>

            {/* year */}
            <div className="sale-card">
              <h2 className="h2Title">This Year's Sale</h2>
              <div className="sale-number">
                <CountUp end={yearSale} duration={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
