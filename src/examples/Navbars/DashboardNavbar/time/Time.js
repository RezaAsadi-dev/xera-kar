import React, { useState, useEffect } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date());

const date = new Date().toLocaleDateString("fa-IR");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="ml-2 sm:flex gap-2 mt-3 text-[14px] hidden">
      {time.toLocaleString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
        second: "2-digit",
        hour12: false,
      })}
      <span className="mx-2">{"/"}</span>
      <p>
      
        {date}
      </p>
    </div>
  );
};

export default Time;

