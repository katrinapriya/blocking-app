import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EditableLabel from 'react-inline-editing';
import PropTypes from 'prop-types';

import reactCSS from 'reactcss'
import { CompactPicker } from 'react-color'
'use strict'

class CompactExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.props.handleChange(color);
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '34px',
          height: '34px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '0px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CompactPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default CompactExample

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
      colors: {},
      // squares: Array(4).fill(null),
      // currentcolor: "rgb(0, 0, 255, 1)",
      currentColorIndex: undefined,
      cellColorIndex: undefined
  };

  handleColorChange = (i, color) => {
    let colors = this.state.colors;
    colors[i] = color;

    this.setState({ colors: colors });
  }

  handleClickRow(i) {
    //this.setState({squares: squares});
    // document.getElementById("color-changer").style.color = this.state.currentcolor;
    this.setState({currentColorIndex: i})
  }

  renderSquare(i) {
    return (
      <div className="row">
        <div className="color">
          <CompactExample handleChange={(color) => {
            this.handleColorChange(i, color);
          }}/>
        </div>
        <div className="note">
          <Label/>
        </div>
      </div>
    );
  }


  render() {
    let {
      colors,
      currentColorIndex,
      cellColorIndex,
    } = this.state;

    return (
      <div>
        <div className="board-row">
          <div className="row">
            <div className="color text">
              Color
             </div>
            <div className="note text">
              Notes
            </div>
          </div>
        </div>
        <div className="board-row" onClick={() => {this.handleClickRow(0)}}>
          {this.renderSquare(0)}
        </div>
        <div className="board-row" onClick={() => {this.handleClickRow(1)}}>
          {this.renderSquare(1)}
        </div>
        <div className="board-row" onClick={() => {this.handleClickRow(2)}}>
          {this.renderSquare(2)}
        </div>
        <div className="board-row" onClick={() => {this.handleClickRow(3)}}>
          {this.renderSquare(3)}
        </div>
        Current color:
        <div
          className="color-changer"
          style={{backgroundColor: colors[currentColorIndex] && colors[currentColorIndex].hex}}
        ></div>
        Sample cell:
        <div
          className="color-changer"
          onClick={() => {
            // We want to take:
            //   currentColorIndex
            // And apply it here:
            // state = currentColorIndex
            this.setState({cellColorIndex: currentColorIndex})
          }}
          style={{backgroundColor: colors[cellColorIndex] && colors[cellColorIndex].hex}}
        ></div>
      </div>
    );
  }
}

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />

      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
