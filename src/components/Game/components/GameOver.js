import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../Game'
import { AppContext } from "../../../App";
import axios from "axios";
import {API_URL} from "../../../constants";
import AuthService from "../../../services/auth.service";
import { GUEST_USER } from "../../../constants";


export default function GameOver() {
    const { gameOver, correctWord, currentAttempt, gameStats, setGameStats } = useContext(GameContext);
    const { currentUser } = useContext(AppContext);
    const [ contentUpdated, setContentUpdated ] = useState(false);

    const calculateScore = () => {
        if (!gameOver.guessedWord) {
            setGameStats({...gameStats, score: 0 });
            setContentUpdated(true);
            return;
        }

        let score = 100;
        let gameTime = gameStats.duration;

        score -= (currentAttempt.attempt - 1) * 10;

        if (gameTime > 100) {
            score -= Math.floor((gameTime - 100) * 0.1);
        }
        if (score < 10) score = 10;

        setGameStats({...gameStats, score: score});
        setContentUpdated(true);
    };

    useEffect(() => {
        calculateScore();
    }, []);

    useEffect(() => {
    if (contentUpdated) {
        const user = currentUser.username === GUEST_USER.username ?
            GUEST_USER.id : AuthService.getCurrentUser().player_id;

        axios.post(API_URL + "players/" + user + "/games/", gameStats);
    }

    }, [gameStats]);

    }, [gameStats]);

    const playAgain = () => {
       window.location.reload();
    };

    return (
        <div className="game-over">
            <h3 align="center">{ gameOver.guessedWord ? "You guessed it!" : "Better luck next time . . . :)" }</h3>
            <h2 align="center"><i>The word was : { correctWord }</i></h2>
            { gameOver.guessedWord && (<h3 align="center">Efficiency score: { gameStats.score }</h3>) }
            <h3 align="center"><button className="play-again" onClick={playAgain} >One More?</button></h3>
        </div>
    );
};

