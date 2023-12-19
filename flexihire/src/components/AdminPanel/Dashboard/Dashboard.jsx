import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Calendar from './Calendar';
import Clock from './Clock';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUserRedirect = () => {
    navigate('/users');
  };

  const handleMailsRedirect = () => {
    navigate('/mails');
  };

  const handleReportsRedirect = () => {
    navigate('/reports');
  };

  const handlePostsRedirect = () => {
    navigate('/managepost');
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const handleNoteClick = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`dashboard ${showCalendar ? 'no-scroll' : ''}`}>
      <div className="container">
        <div
          className={`box kdrama cloy ${hoveredIndex === 0 ? 'hovered' : ''}`}
          onClick={() => handlePostsRedirect()}
          onMouseEnter={() => handleHover(0)}
          onMouseLeave={handleLeave}
        >
          <h4>Posts</h4>
        </div>
        <div
          className={`box kdrama inheritors ${hoveredIndex === 1 ? 'hovered' : ''}`}
          onClick={() => handleMailsRedirect()}
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={handleLeave}
        >
          <h4 className="break">Mails</h4>
        </div>
        <div className="box anime foodwars" onClick={handleNoteClick}>
          <h4>Notes</h4>
        </div>
        {showCalendar && (
          <div className="calendar-overlay">
            <div className="cross-button" onClick={handleCloseCalendar}>
              &#10005;
            </div>
            <Calendar />
          </div>
        )}
        <div className={`box kdrama theking ${hoveredIndex === 1 ? 'hovered' : ''}`}
          onClick={() => handleReportsRedirect()}
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={handleLeave}>
          <h4>Reports</h4>
        </div>
        <div className={`box western mindhunter shadow ${hoveredIndex === 1 ? 'hovered' : ''}`}
          onClick={() => handleUserRedirect()}
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={handleLeave}>
          <h4 className="break">Users</h4>
        </div>
        <div className="box anime kakegurui shadow" >
          <Clock />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
