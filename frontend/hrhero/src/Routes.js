import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";

import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile"
import NewHeroPage from "./pages/NewHero";
import NoMatchPage from "./pages/NoMatch";


const Routes = ()=> {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/employees/:id" component={ProfilePage}/>
          <Route exact path="/newemployee" component={NewHeroPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;