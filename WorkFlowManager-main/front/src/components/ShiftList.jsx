import React from 'react';

const ShiftList = ({ shifts, onSelect }) => (
  <div className='border border-emerald-500 rounded-md px-5 py-5'>
    <h3  className='font-semibold text-2xl text-center mt-1 mb-2'>Shifts</h3>
    <hr className=" border-emerald-500 my-4"/>
    <ul className='text-xl flex flex-col  space-y-3 '>
      {shifts.map(shift => (
        <li class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" key={shift.id} onClick={() => onSelect(shift)}>
          {shift.name} ({shift.time})
        </li>
      ))}
    </ul>
  </div>
);

export default ShiftList;
