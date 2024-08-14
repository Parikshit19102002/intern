import React from 'react'
import Day from './Day';

export default function SubNav() {
  const days=['mon','tue','wed','thu','fri','sat','sun'];
  return (
    <div>
     <nav>
      
     </nav>


     <Routes> 
    <Route path='/mon' element={<MainHeader/>}> 
  
    <Route  index element={<Day />} />
  
    <Route path='/labs' element={<Labs/>} />
   
     </Route>
    </Routes>
    </div>
  )
}
