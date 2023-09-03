import React from 'react';

const RedPills = ({ item }) => {
    return (
        <div className="py-1 px-3 flex items-center  bg-secondary rounded-full">
            <h1 className="text-center text-white capitalize">{item}</h1>
        </div>
    );
};

export default RedPills;
