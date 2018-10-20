import Square from './Square.jsx';
const React = require('react');


class Board extends React.Component {
  constructor(props) {
    super(props);
    let boardWidth = 10;
    let boardHeight = 10;

    let board = [];
    for (var i = 0; i < boardHeight; i++) {
      board.push(Array(boardWidth).fill(0));
    }

    this.state = {
      width: boardWidth,
      height: boardHeight,
      percMines: 0.2, // percentage fullness
      mineList: {}, // y: x (i.e. by rows)
      board: board
    }

    this.clickSquare = this.clickSquare.bind(this);
  }

  endGame() {
    console.log('boom');
  }

  flood(x, y) {
    // if visited, mark as "false"
    // so i can avoid what i've already visited

  }

  clickSquare(e) {
    let value = this.state.board[Number(e.target.getAttribute('col'))][Number(e.target.getAttribute('row'))];

    if (value === 0) {
      e.target.className += ' disabled';
      this.flood(Number(e.target.getAttribute('col')), Number(e.target.getAttribute('row')));
    } else if (value === -1) {
      e.target.className += ' mine';
      this.endGame();
    } else {
      e.target.className += ` num`;
    }
  }


  createBoard() {
    let numMines = Math.round((this.state.width * this.state.height) * this.state.percMines);
    console.log(`generate ${numMines} mines (${this.state.percMines}% fullness)`);
    let mineCount = 0;
    let board = this.state.board;

    while (mineCount < numMines) {
      let randX = Math.round(Math.random() * (this.state.width - 1));
      let randY = Math.round(Math.random() * (this.state.height - 1));

      // if no mine there yet, add mine
      if (Number(board[randY][randX]) >= 0) {
        board[randY][randX] = -1;

        // incr surrounding nums
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            // if w/in bounds, and not a mine
            if (board[randY + j] && board[randY + j][randX + i] >= 0) {
              board[randY + j][randX + i]++;
            }
          }
        }
        mineCount++;
      }

    }

    this.setState({
      board: board
    }, () => {
      console.log(this.state.board);
    });

  }

  componentDidMount() {
    this.createBoard();
  }

  render() {
    // console.log(this.props.clickSquare);
    return (
      <div id="board">
        {
          Array(this.state.height).fill(0).map((x, j) => (
            <div className="row" key={`row${j}`}>
              {Array(this.state.width).fill(0).map((x, i) => <Square clickSquare={this.clickSquare} x={i} y={j} key={`${i}${j}`} value={this.state.board[j][i]}/>)}
            </div>
          ))
        }
      </div>
    );
  }
}

export default Board;
