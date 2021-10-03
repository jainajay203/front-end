import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEndpointComponent from './components/ListEndpointComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEndpointComponent from './components/CreateEndpointComponent';
import UpdateEndpointComponent from './components/UpdateEndpointComponent';
import ViewEndpointComponent from './components/ViewEndpointComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListEndpointComponent}></Route>
                          <Route path = "/endpoints" component = {ListEndpointComponent}></Route>
                          <Route path = "/add-endpoint/:id" component = {CreateEndpointComponent}></Route>
                          <Route path = "/view-endpoint/:id" component = {ViewEndpointComponent}></Route>
                          <Route path = "/edit-endpoint/:id" component = {UpdateEndpointComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
