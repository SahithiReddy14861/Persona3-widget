import React, { useState, useEffect } from 'react';

const SunClock = () => {
    const [offset, setOffset] = useState(100);

    useEffect(() => {
        const updateSun = () => {
            const now = new Date();
            const hours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

            if (hours >= 6 && hours <= 18) {
                // From 6:00 (6AM) to 18:00 (6PM)
                const progress = (hours - 6) / 12; // 0 to 1
                // 100% means right edge, 0% means perfectly centered (Noon), -100% means left edge
                setOffset(100 - (progress * 200));
            } else {
                // Night time: black circle
                setOffset(100);
            }
        };

        updateSun();
        const intervalId = setInterval(updateSun, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="sun-clock-container">
            <div 
                className="sun-circle"
                style={{ left: `${offset}%` }}
            />
        </div>
    );
};

export default SunClock;
