import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {CreatureSmallCard} from '@app-masters/react-creature';
import {creature1} from "./sampleData";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
        </header>
        <CreatureSmallCard creature={creature1}/>
      </div>
    );
  }
}

export default App;
