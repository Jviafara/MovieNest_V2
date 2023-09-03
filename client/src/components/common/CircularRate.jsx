import React, { useEffect, useState } from 'react';

const CircularRate = ({ value }) => {
    const [color, setColor] = useState('');

    useEffect(() => {
        if (value <= 2.5) {
            setColor('text-secondary');
        } else if (value <= 5) {
            setColor('text-orange-500');
        } else if (value <= 7.5) {
            setColor('text-yellow-500');
        } else {
            setColor('text-accent');
        }
    }, [value]);

    return (
        <div>
            <div
                className={`radial-progress ${color}`}
                style={{
                    '--value': value * 10,
                    '--size': '4rem',
                    '--thickness': '4px',
                }}>
                <h1 className="text-primary text-base md:text-lg lg:text-xl font-semibold">
                    {parseFloat(value).toFixed(1)}
                </h1>
            </div>
        </div>
    );
};

export default CircularRate;
