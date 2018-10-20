const React = require('react');

const Square = props => (
  <div className={`square ${props.value === -1 ? 'mine' : ''}`} onClick={props.clickSquare} row={props.x} col={props.y}>
    {Number(props.value) !== 0 ? props.value : ''}
  </div>
);

export default Square;
