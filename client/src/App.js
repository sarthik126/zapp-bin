import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExistingFile from './components/ExistingFile';
import Error404 from './components/Error404';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={ExistingFile} />
      <Route exact path="/error" component={Error404} />
      <Route exact path="/:id" component={ExistingFile} />
      <Route exact path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
