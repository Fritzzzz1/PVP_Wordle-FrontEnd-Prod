import '../../App.css'
import { useState, useEffect, createContext } from 'react';
import { generateWordSet } from "./components/Words";
import { boardDefault } from "./components/Board"
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";

export const GameContext = createContext();

export default function Game() {
    const [board, setBoard] = useState(boardDefault);
    const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 });
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [disabledCorrectLetters, setDisabledCorrectLetters] = useState([]);
    const [disabledAlmostLetters, setDisabledAlmostLetters] = useState([]);
    const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false });
    const [correctWord, setCorrectWord] = useState("");
    const [timerStart] = useState([Math.round(new Date().getTime()/1000)]);
    const [gameStats, setGameStats] = useState(
        { secret: "", duration: 0, won: false, score:null, attempts: [] });


    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.secretWord.toUpperCase());
            setGameStats({...gameStats, secret: words.secretWord });
        });
    }, []);

    const onSelectLetter = (keyVal) => {
        if (currentAttempt.letterPos > 4) return;

        const newBoard = [...board];

        newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1 });
    };

    const onDelete = () => {
        if (currentAttempt.letterPos === 0) return;

        const newBoard = [...board];

        newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
        setBoard(newBoard);
        setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1 });
    };

    const onEnter = () => {
        if (currentAttempt.letterPos !== 5) return;

        let currentWord = "";

        for (let i = 0; i < 5; i++) {
            currentWord += board[currentAttempt.attempt][i];
        }

        if (wordSet.has(currentWord.toLowerCase())) {

            let guessed = gameStats.attempts.slice();
            guessed.push(currentWord);
            setGameStats({...gameStats, attempts: guessed });

            setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });

        } else {
            alert("Not in word list");
            return;
        }

        if (currentWord === correctWord) {
            const timerEnd = Math.round(new Date().getTime()/1000);
            let guessed = gameStats.attempts.slice();
            guessed.push(currentWord);

            setGameStats({...gameStats, duration: timerEnd - timerStart, won: true, attempts: guessed });
            setGameOver({ gameOver: true, guessedWord: true });

            return;
        }
        if (currentAttempt.attempt === 5) {
            const timerEnd = Math.round(new Date().getTime()/1000);
            let guessed = gameStats.attempts.slice();
            guessed.push(currentWord);

            setGameStats({...gameStats, duration: timerEnd - timerStart, attempts: guessed });
            setGameOver({ gameOver: true, guessedWord: false });
        }
    };

    return (
    <div className="game">
        <GameContext.Provider
            value={{
            board, setBoard,
            currentAttempt, setCurrentAttempt,
            onEnter, onDelete, onSelectLetter,
            disabledLetters, setDisabledLetters,
            disabledCorrectLetters, setDisabledCorrectLetters,
            disabledAlmostLetters, setDisabledAlmostLetters,
            correctWord, gameOver, setGameOver,
            gameStats, setGameStats,
        }}
        >
            <Board />
            { gameOver.gameOver ? <GameOver /> : <Keyboard /> }
        </GameContext.Provider>
    </div>
    );
};

