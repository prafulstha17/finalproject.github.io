import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
    }
  }, [timer, navigate]);

  return (
    <>
      <div className="pagenotfound">
        <div className="vue-3 one-piece">
          <div className="bones">
            <div className="bone"></div>
            <div className="bone"></div>
            <div className="bone"></div>
            <div className="bone"></div>
          </div>
          <div className="head">
            <div className="hat">
              <div className="line-left"></div>
              <div className="line-right"></div>
            </div>
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          <div className="mouth">
            <div className="teeth"></div>
          </div>
        </div>

        <h1>404 Page Not Found</h1>
        <div className="author">
          You will be redirected soon. <a>Redirecting in {timer} seconds.</a>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
