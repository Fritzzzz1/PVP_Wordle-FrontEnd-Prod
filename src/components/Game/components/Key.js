import React, { useContext } from 'react'
import { GameContext } from "../Game"

export default function Key({ keyVal, bigKey, disabled, correct, almost } ) {
    const { onEnter, onDelete, onSelectLetter } = useContext(GameContext);


    const selectLetter = () => {
        if(keyVal === "ENTER") {
            onEnter();
        }
        else if (keyVal === "⌫") {
            onDelete();
        }
        else {
            onSelectLetter(keyVal);
        }
    };
    function determineKeyId() {
        if (bigKey) return "big";
        if (correct) return "correct";
        if (almost) return "almost";
        if (disabled) return "disabled";
        return "default";
    }
    return (
        <div className="key" id={ determineKeyId() } onClick={selectLetter}>{keyVal}</div>
    );
};

