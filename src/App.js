import React, { Component } from 'react';
import './App.css';
import Board from './Components/Board.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.clickSquare = this.clickSquare.bind(this);
  }


  render() {
    return (
      <div className="App">
        <Board/>
      </div>
    );
  }
}

export default App;
