import {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {getWeek} from './3_APIs/routineWeekHelpers'
import {getQuery} from './3_APIs/queryApi'
import './App.scss'
import './_variables.scss'
import PrivateRoute from './7_Auth/PrivateRoute'
import PublicLandingPage from './5_Pages/landing_page/LandingPage'
import SignIn from './7_Auth/SignIn'
import SignUp from './7_Auth/SignUp'
import UserDashBoard from './5_Pages/user_dashboard/UserDashBoard'
import Schedule from './4_Components/calendar/Calendar'
import ManageRoutines from './5_Pages/manage_routines/ManageRoutines'
import CreateOrEditRoutine from './5_Pages/create_routine/CreateOrEditRoutine'
import ManageExercises from './5_Pages/manage_exercises/ManageExercises'

// experimental
import RoutineWeekDnD from './4_Components/routines_dnd/RoutineWeekDnD'

function App({loggedIn}) {

  const testWeekId = '5fd6eb71b0321644dc6bf08a'
  const testWeekQueryStr = 'populate_one=exercise_sets&populate_two=exercise'
  const query = `/routines/weeks/${testWeekId}?populate_one=exercise_sets&populate_two=exercise`
  // /routines/weeks/5fd6eb71b0321644dc6bf08a?populate_one=exercises
  const [weekData, setWeekData] = useState()
  
  useEffect(()=>{
    /* getWeek(testWeekId, testWeekQueryStr) */
    getQuery(query)
    .then(AppJsQueryResponse => {
      console.log({AppJsQueryResponse})
      if(AppJsQueryResponse.success){
        setWeekData(AppJsQueryResponse.data)
      } else{
        console.log({AppJsQueryResponse})
      }
    })
  }, [])

  console.log({loggedIn})

  return (
    <div className="App">
      <Switch>

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup">
          <SignUp/>
        </Route>  

        {loggedIn ? 
        <Route exact path="/">
          <UserDashBoard />
        </Route> 
        : 
        <Route exact path="/">
          <PublicLandingPage />
        </Route>  
      }

        

        <Route exact path="/schedule">
          <Schedule />
        </Route>
        <Route exact path="/exercises">
          <ManageRoutines />
        </Route>
        <Route exact path="/manage-exercises">
          <ManageExercises />
        </Route>
        <Route exact path="/manage-routines" component={ManageRoutines} />
        <Route exact path="/create-routine" component={CreateOrEditRoutine} />


        {/* Experimental */}
        <Route exact path="/routines-dnd">
          <RoutineWeekDnD weekData={weekData} setWeekData={setWeekData}/>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)