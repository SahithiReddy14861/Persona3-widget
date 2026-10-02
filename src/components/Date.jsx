import React, { useState, useEffect } from 'react';
import SunClock from './SunClock';

const DateWidget = () => {
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, '0');
            const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const newDateString = `${dd}/${mm}`;
            setDateString((prev) => (prev !== newDateString ? newDateString : prev));
        };

        updateDate();

        // Check every minute instead of a single long timeout
        // This is much more robust against OS sleep/suspend and timer throttling
        const intervalId = setInterval(updateDate, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="date-container">
            <h2 className="date-text">{dateString}</h2>
            <SunClock />
        </div>
    );
};

export default DateWidget;
