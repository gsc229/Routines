import { connect } from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import './App.scss'
import PrivateRoute from './7_Auth/PrivateRoute'
import PublicLandingPage from './5_Pages/landing_page/LandingPage'
import SignIn from './7_Auth/SignIn'
import SignUp from './7_Auth/SignUp'
import UserDashBoard from './5_Pages/user_dashboard_page/UserDashBoardPage'
import Schedule from './4_Components/calendar/Calendar'
import ManageRoutinesPage from './5_Pages/manage_routines_page/ManageRoutinesPage'
import CreateOrEditRoutinePage from './5_Pages/create_routine_page/CreateOrEditRoutinePage'
import ManageCurrentRoutinePage from './5_Pages/manage_routine_page/ManageCurrentRoutinePage'
import CreateOrEditWeekPage from './5_Pages/create_week_page/CreateOrEditWeekPage'
import CreateOrEditExercisePage from './5_Pages/create_exercise_page/CreateOrEditExercisePage'
import CreateSetGroupPage from './5_Pages/create_set_group_page/CreateSetGroupPage'
import ManageExercisesPage from './5_Pages/manage_exercises_page/ManageExercisesPage'
import BrowseExercisesPage from './5_Pages/browse_exercises_page/BrowseExercisesPage'

function App({loggedIn}) {

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
        <Route exact path="/view-routine/:routineId/:routineName" component={ManageCurrentRoutinePage} />

        
        <Route exact path="/create-exercise" component={CreateOrEditExercisePage} />
        <Route exact path="/editing-routine/:routineId/create-week" component={CreateOrEditWeekPage} />
        <Route exact path="/manage-exercises" component={ManageExercisesPage} />
        <Route exact path="/browse-exercises" component={BrowseExercisesPage} />
        <Route exact path="/create-set-group/:routineName/:weekNumber/:dayNumber" component={CreateSetGroupPage} />
        
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