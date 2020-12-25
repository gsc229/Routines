import {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {getWeek} from './3_APIs/routineWeekHelpers'
import {getQuery} from './3_APIs/queryApi'
import './App.scss'
import PrivateRoute from './7_Auth/PrivateRoute'
import PublicLandingPage from './5_Pages/landing_page/LandingPage'
import SignIn from './7_Auth/SignIn'
import SignUp from './7_Auth/SignUp'
import UserDashBoard from './5_Pages/user_dashboard_page/UserDashBoardPage'
import Schedule from './4_Components/calendar/Calendar'
import ManageRoutinesPage from './5_Pages/manage_routines_page/ManageRoutinesPage'
import CreateOrEditRoutinePage from './5_Pages/create_routine_page/CreateOrEditRoutinePage'
import CreateOrEditWeekPage from './5_Pages/create_week_page/CreateOrEditWeekPage'
import CreateOrEditExercisePage from './5_Pages/create_exercise_page/CreateOrEditExercisePage'
import ManageExercisesPage from './5_Pages/manage_exercises_page/ManageExercisesPage'
import BrowseExercisesPage from './5_Pages/browse_exercises_page/BrowseExercisesPage'
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
        <Route exact path="/manage-routines" component={ManageRoutinesPage} />
        <Route exact path="/create-routine" component={CreateOrEditRoutinePage} />
        <Route exact path="/create-exercise" component={CreateOrEditExercisePage} />
        <Route exact path="/editing-routine/:routineId/create-week" component={CreateOrEditWeekPage} />
        <Route exact path="/manage-exercises" component={ManageExercisesPage} />
        <Route exact path="/browse-exercises" component={BrowseExercisesPage} />

      


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