import React, { useState, useEffect } from 'react';

const Day = () => {
    const [day, setDay] = useState('');

    useEffect(() => {
        const updateDay = () => {
            const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
            setDay((prevDay) => (prevDay !== currentDay ? currentDay : prevDay));
        };

        // Initial set
        updateDay();

        // Check every minute instead of a single long timeout
        // This is much more robust against OS sleep/suspend and timer throttling
        const intervalId = setInterval(updateDay, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="day-container">
            <h1 className="day-text">
                {day}
            </h1>
        </div>
    );
};

export default Day;
