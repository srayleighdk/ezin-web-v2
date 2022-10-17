import React, { useState } from "react";

export default function ComingSoon() {
  var myInterval;
  const [state, setState] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const commingSoonTime = () => {
    let endTime = new Date("August 23, 2022 17:00:00 PDT");
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let days = Math.floor(timeLeft / 86400);
    let hours = Math.floor((timeLeft - days * 86400) / 3600);
    let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    let seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    );
    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }
    setState({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  const componentDidMount = () => {
    myInterval = setInterval(() => {
      commingSoonTime();
    }, 1000);
  };

  const componentWillUnmount = () => {
    clearInterval(myInterval);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="coming-soon-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="coming-soon-content">
              <h1>Tính năng sắp ra mắt</h1>

              {/* <div id="timer">
                <div id="days">
                  {state.days} <span>Days</span>
                </div>
                <div id="hours">
                  {state.hours} <span>Hours</span>
                </div>
                <div id="minutes">
                  {state.minutes} <span>Minutes</span>
                </div>
                <div id="seconds">
                  {state.seconds} <span>Seconds</span>
                </div>
              </div> */}

              {/* <form className="newsletter-form">
                <input
                  type="email"
                  className="input-newsletter"
                  placeholder="Enter email address"
                  name="email"
                  required
                />

                <button type="submit" className="default-btn">
                  Notify Me
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
