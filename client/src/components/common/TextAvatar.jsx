import React from 'react';

const TextAvatar = ({ text }) => {
    const stringToColor = (str) => {
        let hash = 0;
        let i;

        for (i = 0; i < str.length; i += 1) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    };

    return (
        <div className="avatar placeholder">
            <div
                style={{ backgroundColor: stringToColor(text) }}
                className="text-white font-bold rounded-full w-10">
                <span className="text-lg">{text.split(' ')[0][0]}</span>
            </div>
        </div>
    );
};

export default TextAvatar;
