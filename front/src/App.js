import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddHeadline from "./components/add-headline.component";
import Headline from "./components/headline.component";
import HeadlinesList from "./components/headlines-list.component";

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/headlines" className="navbar-brand">
            Rickzhang
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/headlines"} className="nav-link">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/headlines"]} component={HeadlinesList} />
            <Route exact path="/add" component={AddHeadline} />
            <Route path="/headlines/:id" component={Headline} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
