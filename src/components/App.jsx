import '../styles/App.css'
import Die from './Die'
import React, {useState, useEffect} from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

function App() {
  const [newDice, setNewDice] = useState(rollNewDice())
  const [tenzies, setTenzies] = useState(false)

  function rollNewDice() { 
      const myArray = new Array;
      for(let i = 0; i < 10; i++) {
        myArray.push({value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()})
      }
      return myArray
  }

  useEffect(() => {
      const allHeld = newDice.every(die => die.isHeld)
      const firstValue = newDice[0].value
      const allSameValue = newDice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
        setTenzies(true)
      }
  }, [newDice])

  function holdDice(id) {
    setNewDice(prevDice => prevDice.map(die => (
          die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
        )
      )
    )
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setNewDice(rollNewDice())
    }
    else {
      setNewDice(prevDice => prevDice.map(die => (
        die.isHeld ? {...die} : {...die, value: Math.ceil(Math.random() * 6)}
          )
        )
      )
    }
  }

  return (
    <main className="main">
      {tenzies && <Confetti />}
      <div className="board">
        <h1 className='board--title'>Tenzies</h1>
        <h3 className='board--description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
        { newDice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />) }
        <div className="board--button" onClick={() => rollDice()}>{tenzies ? 'New Game' : 'Roll'}</div>
      </div>
    </main>
  )
}

export default App