import PendingReturns from './components/PendingReturns'
import Statistics from './components/Statistics'
import MostRequestedBooks from './components/MostRequestedBooks'
import TopReaders from './components/TopReaders'
import TopDonors from './components/TopDonors'
import LinesChart from './components/LineChart'
//import LinesChart from './components/LineChart'


export default function Dashboard() {
  return (
    <div className="dashboard grid grid-cols-4 gap-4">
      <div className="col-span-3 ">
       
        <PendingReturns />
        <LinesChart />
        
       
      </div>
      <div className="col-span-1">
        <Statistics />
        
        
      </div>
      <div className="col-span-3 ">
        <MostRequestedBooks />  
      </div>
      
      <div className="col-span-1 space-y-4">
        <TopReaders />
        <TopDonors />
      </div>
      
    </div>
  )
}