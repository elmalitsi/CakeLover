import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CakeView from "./containers/CakesView";
import CakeDetails from "./containers/CakeDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/cakes" component={CakeView} />
          <Route path="/cake/:name" component={CakeDetails} />
          <Route path="" component={CakeView} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
