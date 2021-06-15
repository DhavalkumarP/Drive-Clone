
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import SignUp from './components/Authentication/signup';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './components/Authentication/Profile';
import LogIn from './components/Authentication/LogIn';
import PrivateRoute from './components/Authentication/PrivateRoute';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Update from './components/Authentication/Update';
import Dashboard from './components/Google-Drive/Dashboard';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/user" component={Profile}>
          </PrivateRoute>
          <PrivateRoute path="/folder/:folderId" component={Dashboard}>
          </PrivateRoute>
          <PrivateRoute exact path="/" component={Dashboard}>
          </PrivateRoute>
          <PrivateRoute exact path="/Update" component={Update}>
          </PrivateRoute>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/ForgotPassword">
            <ForgotPassword />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;