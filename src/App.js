import {useEffect} from 'react'
import { connect } from 'react-redux'
import {clearErrorMessage} from './1_Actions/userActions'
import {Switch, Route} from 'react-router-dom'
import {environment} from './config/config'
import './App.scss'
import PrivateRoute from './7_Auth/PrivateRoute'
import PublicLandingPage from './5_Pages/landing_page/LandingPage'
import SignIn from './7_Auth/SignIn'
import SignUp from './7_Auth/SignUp'
import UserDashBoard from './5_Pages/user_dashboard_page/UserDashBoardPage'
import ManageRoutinesPage from './5_Pages/manage_routines_page/ManageRoutinesPage'
import CreateOrEditRoutinePage from './5_Pages/create_routine_page/CreateOrEditRoutinePage'
import ManageCurrentRoutinePage from './5_Pages/manage_routine_page/ManageCurrentRoutinePage'
import CreateOrEditExercisePage from './5_Pages/create_exercise_page/CreateOrEditExercisePage'
import CreateSetGroupPage from './5_Pages/create_set_group_page/CreateSetGroupPage'
import ManageExercisesPage from './5_Pages/manage_exercises_page/ManageExercisesPage'
import BrowseExercisesPage from './5_Pages/browse_exercises_page/BrowseExercisesPage'
import SchedulePage from './5_Pages/schedule_page/SchedulePage'
import ExecuteSetsPage from './5_Pages/execute_sets_page/ExecuteSetsPage'


function App({
  loggedIn,
  user_ERROR,
  routine_ERROR,
  week_ERROR,
  set_group_ERROR,
  exercise_set_ERROR,
  exercise_ERROR,
  clearErrorMessage
}) {

  
useEffect(() => {
  const error_message = `${user_ERROR}${routine_ERROR}${set_group_ERROR}${exercise_set_ERROR}${exercise_ERROR}` 
  if(error_message && environment ==='development'){
    console.log(`${user_ERROR}${routine_ERROR}${set_group_ERROR}${exercise_set_ERROR}${exercise_ERROR}`)
  }

  if(error_message){
    setTimeout(() => clearErrorMessage(), 4000)
  }
  
}, 
[user_ERROR,routine_ERROR,week_ERROR,set_group_ERROR,exercise_set_ERROR,exercise_ERROR])




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
          <SchedulePage />
        </Route>
        <Route exact path="/manage-routines" component={ManageRoutinesPage} />
        <Route exact path="/create-routine" component={CreateOrEditRoutinePage} />
        <Route exact path="/view-routine/:routineId/:routineName" component={ManageCurrentRoutinePage} />
        <Route  path='/execute-sets/:setDate' component={ExecuteSetsPage} />
        <Route exact path="/create-exercise" component={CreateOrEditExercisePage} />
        <Route exact path="/manage-exercises" component={ManageExercisesPage} />
        <Route exact path="/browse-exercises" component={BrowseExercisesPage} />
        <Route exact path="/create-set-group/:routineName/:weekNumber/:dayNumber" component={CreateSetGroupPage} />
        
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  user_ERROR: state.userReducer.error_message,
  routine_ERROR: state.routineReducer.error_message,
  week_ERROR: state.weekReducer.error_message,
  set_group_ERROR: state.setGroupReducer.error_message,
  exercise_set_ERROR: state.exerciseSetReducer.error_message,
  exercise_ERROR: state.exerciseReducer.error_message
})

const mapDispatchToProps = {
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)