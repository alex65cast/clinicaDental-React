
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker className="calendarDesing" selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
};