import React, { Component } from 'react';
import './App.css';
import {reportForm as Report} from './components/report';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Report/>
      </div>
    );
  }
}

export default App;
