import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  state = {value:this.props.value};
  render() {
    return (
      <button className="square" onClick={() => {this.props.onClick()}}>{this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  state = {
      squares: Array(4).fill(null),
  };


  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <div>
        <Square value={this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
        />
        <div className="notes">
        Hello
        </div>
      </div>
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
        </div>
        <div className="board-row">
          {this.renderSquare(1)}
        </div>
        <div className="board-row">
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
