import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    useEffect(() => {
        if (whiteTime === -1 || blackTime === -1) {
            alert(currentPlayer?.color + " lose.");
            handleRestart();
        }
    }, [whiteTime, blackTime]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.BLACK ? decrementBlackTimer : decrementWhiteTimer

        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    }

    function handleRestart () {
        setWhiteTime(10);
        setBlackTime(10);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>

            <h2>Чёрные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;