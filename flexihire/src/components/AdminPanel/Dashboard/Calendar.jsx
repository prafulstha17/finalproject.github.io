// Calendar.js

import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [events, setEvents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Use effect to update the local storage when the selected date changes
  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  // Load events from local storage when the component mounts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
    setDataLoaded(true);
  }, []); // The empty dependency array ensures that this effect runs only once

  // Save events to local storage whenever the events state changes
  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events, dataLoaded]);

  const addEvent = () => {
    const newEvent = prompt("Enter a new event:");
    if (newEvent && selectedDate) {
      const dateWithEvent = `${selectedYear}-${selectedMonth}-${selectedDate}`;
      setEvents([
        ...events,
        { date: dateWithEvent, event: newEvent, crossedOut: false },
      ]);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const handleYearChange = (value) => {
    setSelectedYear(parseInt(value, 10) || ""); // Use empty string if parsing fails
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year, month) =>
    new Date(year, month - 1, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);

  const monthDays = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handleEventClick = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].crossedOut = !updatedEvents[index].crossedOut;
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <div className="wholeCalendar">
        <div className="leftCalendar">
          <div className="today">
            <h4>Today</h4>
            <div className="date">{new Date().getDate()}</div>
            <div className="day">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </div>
          </div>

          <button onClick={addEvent} className="add-event-btn">
            <i class="fa-solid fa-calendar-plus"></i>
          </button>
          <div className="events-container">
            <div className="events-list">
              {events.map(
                (event, index) =>
                  selectedDate === parseInt(event.date.split("-")[2], 10) && (
                    <div
                      key={index}
                      className={`event ${
                        event.crossedOut ? "crossed-out" : ""
                      }`}
                      onClick={() => handleEventClick(index)}
                    >
                      {event.event}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="rightCalendar">
          <div className="month">
            <div className="navigation">
              <button onClick={handlePrevMonth}>&lt;</button>
              <div className="dropdowns">
                <select value={selectedMonth} onChange={handleMonthChange}>
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {new Date(2000, index, 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="year-input"
                  style={{ appearance: "none" }}
                />
              </div>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days-of-week">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-of-week">
                  {day}
                </div>
              ))}
            </div>
            <div className="days">
              {[...Array(firstDayOfMonth).fill(null), ...monthDays].map(
                (day, index) => (
                  <div
                    key={index}
                    className={`day ${
                      day === selectedDate && day !== null
                        ? "selected"
                        : day === new Date().getDate()
                        ? "today"
                        : ""
                    } ${day === null ? "emptyDate" : ""}`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day !== null ? day : ""}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
