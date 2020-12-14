import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalLogin from "./component/Login";
import Dashboard from "./component/admin/dashboard/Dashboard";
import Private from "./Private";
import UserAction from "./component/admin/UserAction";
import News from "./component/admin/news/News";
import Class from "./component/admin/classes/Class";
import Enroll from "./component/admin/classes/Enroll";
import UserLogin from "./component/UserLogin";
import PrivateUser from "./PrivateUser";
import UserDashboard from "./component/student/Dashboard";

function App() {
  return (
    <div className="app">
      <Router>
        {/* Admin */}
        <Switch>
          <Private exact path="/admin" component={Dashboard} />
        </Switch>
        <Switch>
          <Private exact path="/admin/user/action" component={UserAction} />
        </Switch>
        <Switch>
          <Private exact path="/admin/news" component={News} />
        </Switch>
        <Switch>
          <Private exact path="/admin/classes" component={Class} />
        </Switch>
        <Switch>
          <Private exact path="/admin/enroll/:id" component={Enroll} />
        </Switch>
        {/* ----------------------------------------------- */}
        {/* User */}
        <Switch>
          <PrivateUser exact path="/student" component={UserDashboard} />
        </Switch>
        {/*---------------------------------------------------------  */}
        <Switch>
          <Route exact path="/global/login">
            <GlobalLogin />
          </Route>
          <Route exact path="/">
            <UserLogin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
