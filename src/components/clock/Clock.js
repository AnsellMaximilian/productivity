import React, {useState} from 'react';

import style from './styles/clock.module.scss';

import {mmss} from './utils/time';

export default function Clock() {
    const [sessionTime, setSessionTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timeMode, setTimeMode] = useState('session');

    const [currentTime, setCurrentTime] = useState(0);
    
    // TIMING
    const increaseSession = () => setSessionTime(time => time + 60000);
    const increaseBreak = () => setBreakTime(time => time + 60000);

    const decreaseSession = () => setSessionTime(time => time > 0 ? time - 60000 : time);
    const decreaseBreak = () => setBreakTime(time => time > 0 ? time - 60000 : time);

    // PLAY CONTROL
    const play = (mode) => {
        setIsPlaying(true);
        setCurrentTime(time => {
            return time || (mode === 'session' ? sessionTime : breakTime);
        }); // if current session is not finished, continue; else, get session/break time
        clearInterval(timer);
        const currentTimer = setInterval(() => {
            setCurrentTime(time => {
                if(time <= 0){
                    clearInterval(currentTimer);
                    if(mode === 'session'){
                        startBreakTime();
                    }else{
                        setTimeMode('session');
                    }
                    return time
                }
                return time - 1000
            });
        }, 1000)
        setTimer(currentTimer);
    }

    const pause = () => {
        clearInterval(timer);
    }

    const reset = () => {
        clearInterval(timer);
        setIsPlaying(false);
        setCurrentTime(0);
        setSessionTime(1500000);
        setBreakTime(300000);
    }

    const stop = () => {
        clearInterval(timer);
        setIsPlaying(false);
        setCurrentTime(0);
    }

    const startBreakTime = () => {
        setTimeout(() => {
            setTimeMode('break');
            play('break');
        }, 2000)
    }

    return (
        <div className={style.clock}>
            <div className={style.display}>
                {
                    isPlaying ? 
                    <span>{mmss(currentTime)}</span>
                    :
                    <>
                        <span className={style.display__label}>break {">"}</span>
                        <span>{`${breakTime/60000} - ${sessionTime/60000}`}</span>
                        <span className={style.display__label}>{"<"} session</span>
                    </>
                }
            </div>
            
            <div className={style.control}>
                <div className={style.timing}>
                    <div className={`${style.timing__section} ${style[`timing__section--${timeMode === 'break' ? 'on' : 'off'}`]}`}>
                        <div>break</div>
                        <div className={style.timing__section__buttons}>
                            <button onClick={increaseBreak}>+</button>
                            <button onClick={decreaseBreak}>-</button>
                        </div>
                    </div>
                    <div className={`${style.timing__section} ${style[`timing__section--${timeMode === 'session' ? 'on' : 'off'}`]}`}>
                        <div>session</div>
                        <div className={style.timing__section__buttons}>
                            <button onClick={increaseSession}>+</button>
                            <button onClick={decreaseSession}>-</button>
                        </div>
                    </div>
                </div>
                <div className={style['play-control']}>
                    <button className="fas fa-play" onClick={() => play(timeMode)}></button>
                    <button className="fas fa-pause" onClick={pause}></button>
                    <button className="fas fa-stop" onClick={stop}></button>
                    <button className="fas fa-sync-alt" onClick={reset}></button>
                </div>
            </div>
        </div>
    )
}
