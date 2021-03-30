import React, { useState, useEffect } from "react";
import axios from "axios";

const TimeAudi = () => {
  const [timingsAvailable, setTimingsAvailable] = useState([]);
  const date = localStorage.getItem("date");

  useEffect(() => {
    axios.get(`/baudis/${date}`).then((res) => {
      setTimingsAvailable(res.data);
    });
  }, [date]);

  return (
    <div>
      Available time of audi:{" "}
      {timingsAvailable.map((timing, i) => (
        <p key={i}>
          Slot {i + 1}: {timing}
        </p>
      ))}
    </div>
  );
};

export default TimeAudi;
