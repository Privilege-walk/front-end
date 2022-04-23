import React, { useState, useEffect } from "react";

import Box from '@mui/material/Box';

export default function Timer({questionIndex}) {

    const [startTime, setStartTime] = useState(Date.now());
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            let ns = 60
            if (seconds == (ns-1)) {
                setMinutes((minutes + 1) % ns)
            }
            // setSeconds((seconds + 1) % ns)
            setSeconds(parseInt((Date.now() - startTime)/1000) % ns)
        }, 1000);
        return () => clearInterval(interval);
    })

    useEffect(() => {
        setStartTime(Date.now());
        setSeconds(0);
        setMinutes(0);
    }, [questionIndex])

    return (
        <Box component="span" sx={{ m: '20px 0px' }}>
            Time - {minutes < 10 ? ('0'+minutes) : minutes} : {seconds < 10 ? ('0'+seconds) : seconds}
        </Box>
    );
}