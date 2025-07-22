import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice());
    const newGameRef = useRef(null);

    const gameWon =
        dice.every((die) => die.isHeld) &&
        dice.every((die) => die.value === dice[0].value);

    useEffect(() => {
        if (gameWon) {
            newGameRef.current.focus();
        }
    }, [gameWon]);

    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }));
    }

    function rollDice() {
        setDice((oldDice) =>
            oldDice.map((die) =>
                die.isHeld
                    ? die
                    : { ...die, value: Math.ceil(Math.random() * 6) }
            )
        );

        if (gameWon) {
            setDice(generateAllNewDice());
        }
    }

    function hold(id) {
        setDice((oldDice) =>
            oldDice.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    }

    const diceElements = dice.map((objDice) => (
        <Die
            key={objDice.id}
            id={objDice.id}
            value={objDice.value}
            isHeld={objDice.isHeld}
            hold={hold}
            // hold={() => hold(objDice.id)} // cooler way
        />
    ));

    return (
        <main>
            {gameWon && <ReactConfetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && (
                    <p>
                        Congratulations! You won! Press "New Game" to start
                        again.
                    </p>
                )}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-btn" onClick={rollDice} ref={newGameRef}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
