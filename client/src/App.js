import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddHeadline from "./components/add-headline.component";
import Headline from "./components/headline.component";
import HeadlinesList from "./components/headlines-list.component";
import AboutUs from "./components/about-us.component"
import Landing from "./components/landing-page.component";

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark ">

          <a href="/" className="  navbar-brand maintitle ">
            Clickfait
          </a>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/headlines"} className="nav-link">
                Saved Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/headline", "/headlines", "/headlines/saved"]} component={HeadlinesList} />
            <Route exact path="/add" component={AddHeadline} />
            <Route path="/headlines/:id" component={Headline} />
            <Route exact path={["/about", "/About"]} component={AboutUs} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
