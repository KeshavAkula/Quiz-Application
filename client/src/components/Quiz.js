import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

import '../styles/Timer.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'

export default function Quiz() {
    const [check, setChecked] = useState(undefined)
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /** Handle timer countdown */
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAutoSubmit(); // Auto-submit when time is up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    /** Auto-submit function */
    function handleAutoSubmit() {
        navigate('/result'); // Navigate to result page
    }

    /** next button event handler */
    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
        }
        setChecked(undefined);
    }

    /** Prev button event handler */
    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
    }

    /** Redirect when all questions are answered */
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true} />
    }

    /** Format mm:ss */
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <div className="timer text-light" style={{ textAlign: 'center', fontSize: '1.5em', marginBottom: '20px' }}>
                ⏱️ Time Left: <strong>{formatTime(timeLeft)}</strong>
            </div>

            <Questions onChecked={onChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    )
}


