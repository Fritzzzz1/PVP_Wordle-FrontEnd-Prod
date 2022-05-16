import React, { useContext, useEffect } from 'react'
import { GameContext } from "../Game"

export default function Letter({ letterPos, attemptVal }) {
    const { board, correctWord, currentAttempt, setDisabledLetters,
        setDisabledCorrectLetters, setDisabledAlmostLetters } = useContext(GameContext);

    const letter = board[attemptVal][letterPos];
    const correct = correctWord[letterPos] === letter;
    let almost = !correct && letter !== "" && correctWord.includes(letter);
    let dupCounterBefore = 0, dupCounterAfter = 0, correctDupRemains = 0;

    for (let i = 0; i < 5; i++) {

        if ( board[attemptVal][i] === letter ) {
            if (i < letterPos) dupCounterBefore++;
            else if (i > letterPos) {
                dupCounterAfter++;
                if (correctWord[i] === letter) correctDupRemains++;
            }}

        if (dupCounterBefore || dupCounterAfter) {
            const correctDupCount = correctWord.split(letter).length - 1

            if (dupCounterBefore && correctDupCount <= dupCounterBefore)
                almost = false;
            if (dupCounterAfter && correctDupRemains)
                almost = false;
        }}

    const letterState = currentAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "wrong");

    useEffect(() => {
        if (!correct && !almost && letter !== "")
            setDisabledLetters((prev) => [...prev, letter]);

        if (correct)
            setDisabledCorrectLetters((prev) => [...prev, letter]);

        else if (almost)
            setDisabledAlmostLetters((prev) => [...prev, letter]);

    }, [currentAttempt.attempt]);

    return (
        <div className="letter" id={ letterState ? letterState : "default" }>{letter}</div>
    );
};

