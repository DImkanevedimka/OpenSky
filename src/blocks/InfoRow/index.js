import React from "react";
import moment from "moment";
import "./index.css";

export const InfoRow = ({ icao, departureTime, arrivalTime }) => {
  const startTime = moment.utc(departureTime, "X").format("MMM Do - HH:mm");
  const endTime = moment.utc(arrivalTime, "X").format("MMM Do - HH:mm");
  return (
    <div className="row-info">
      <div>{icao}</div>
      <div>{startTime}</div>
      <div>{endTime}</div>
    </div>
  );
};
