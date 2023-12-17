import React, { useEffect } from 'react';
import "./Clock.scss";

const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const Clock = () => {
  useEffect(() => {
    // initialize the clock in a self-invoking function
    (function clock() {
      var hour = document.getElementById('hour');
      var min = document.getElementById('min');
      var sec = document.getElementById('sec');

      // set up a loop
      (function loop() {
        requestAnimFrame(loop);
        draw();
      })();

      // position the hands
      function draw() {
        var now = new Date(), // now
          then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0), // midnight
          diffInMil = now.getTime() - then.getTime(), // difference in milliseconds
          h = diffInMil / (1000 * 60 * 60), // hours
          m = h * 60, // minutes
          s = m * 60; // seconds

        // rotate the hands accordingly
        sec.style.transform = 'rotate(' + s * 6 + 'deg)';
        hour.style.transform = 'rotate(' + (h * 30 + h / 2) + 'deg)';
        min.style.transform = 'rotate(' + m * 6 + 'deg)';
      }
    })();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="icon-large icon-clock">
      <div className="clock">
        <ol>
          {Array.from({ length: 12 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ol>
        <div id="hour"></div>
        <div id="min"></div>
        <div id="sec"></div>
      </div>
    </div>
  );
};

export default Clock;
