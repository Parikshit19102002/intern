// import React from 'react'

// export default function Day({ days, onSelect }) {
//   return (
//     <div className='border border-emerald-500 rounded-md px-5 py-5'>
//     <h3  className='font-semibold text-2xl text-center mt-1 mb-1' >Days</h3>
//     <hr className=" border-emerald-500 my-4"/>
//     <div>

//     <ul className='text-xl flex flex-col space-y-3'>
//       {days.map(day => (
//         <li className='btn btn-accent' key={day.id} onClick={() =>
//         {
//           onSelect(day)

//         } } >
//         {day.id}.  {day.day} 
//         </li>
//       ))}
//     </ul>
//       </div>
//   </div>
//   )
// }

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function Day({ days, onSelect }){
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     console.log("Selected Date Info:", {
//       fullDate: date,
//       day: date.getDate(),
//       month: date.getMonth() + 1, // Months are zero-indexed
//       year: date.getFullYear(),
//       weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
//       timestamp: date.getTime(),
//     });
//   };

//   return (
//     <div>
//       <Calendar 
//         onChange={handleDateChange} 
//         value={selectedDate} 
//       />
//     </div>
//   );
// };

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Day({ days, onSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
   
               

                // const selec
            const sdate=    {
                  fullDate: date?.toString() ,
                  day: date.getDate(),
                  month: date.getMonth() + 1, // Months are zero-indexed
                  year: date.getFullYear(),
                  weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
                  timestamp: date.getTime(),
                }
                onSelect(sdate)
      
             
    console.log("Selected Date Info:", {
      fullDate:  date?.toString(),
      day: date.getDate(),
      month: date.getMonth() + 1, // Months are zero-indexed
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      timestamp: date.getTime(),
    });
  };

  return (
    <div className="p-4 max-w-md text-gray-400 border border-emerald-500 rounded-md px-5 py-5">
      <div className="bg-transparent  overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-400 mb-4 text-center">Select a Date</h2>
          <hr className=" border-emerald-500 my-4"/>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar  bg-transparent border-none rounded-md"
          />
        </div>
      </div>
    </div>
  );
};








// export default Calendar;

