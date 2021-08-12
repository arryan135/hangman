import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from "./words.js"

class Hangman extends Component {
  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord(lost) {
    return !lost ? this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_")) : this.state.answer.split("");
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key = {ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleRestart(){
    this.setState((st) => {
      return {nWrong: 0,
      guessed: new Set(),
      answer: randomWord()}
    })
  }

  restart(){
    this.handleRestart();
  }

  funcs(){}
  /** render: render game */
  render() {
    let nWrong = this.state.nWrong;
    let maxGuesses = this.state.answer.length;
    let altText = `${nWrong}/${maxGuesses} guesses`
    let gameOver = nWrong >= maxGuesses;
    let isWinner = this.guessedWord(false).join("") === this.state.answer;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "";

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt = {altText} />
        <p>{`Number wrong: ${this.state.nWrong}.`}</p>
        <p className='Hangman-word'>
          {gameOver ? this.guessedWord(true) : this.guessedWord(false)}
        </p>
        { gameOver ? <p>You lose</p> : <p className='Hangman-btns'>{gameState === "" ? <p>You Win!</p> : gameState}</p>}
        <div className = "Hangman-btns">
          <button id = "reset" onClick = {this.restart}>Restart</button>
        </div>
      </div>
    );
  }
}

export default Hangman;
