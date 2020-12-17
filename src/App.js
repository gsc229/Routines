import {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {getWeek} from './3_APIs/routineWeekHelpers'
import UserDashBoard from './5_Pages/UserDashBoard'
import ManageRoutines from './5_Pages/ManageRoutines'

// experimental
import RoutineWeekDnD from './4_Components/routines_dnd/RoutineWeekDnD'

function App() {

  const testWeekId = '5fd6eb71b0321644dc6bf08a'
  const testWeekQueryStr = 'populate_one=exercises&populate_two=exercise'
  // /routines/weeks/5fd6eb71b0321644dc6bf08a?populate_one=exercises
  const [weekData, setWeekData] = useState()
  
  useEffect(()=>{
    getWeek(testWeekId, testWeekQueryStr)
    .then(response => {
      if(response.success){
        setWeekData(response.data)
      } else{
        console.log({response})
      }
    })
  }, [])



  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <UserDashBoard />
        </Route>
        <Route exact path="/manage-routines">
          <ManageRoutines />
        </Route>


        {/* Experimental */}
        <Route exact path="/routines-dnd">
          <RoutineWeekDnD weekData={weekData} setWeekData={setWeekData}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
