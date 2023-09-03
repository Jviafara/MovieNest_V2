import React from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full lg:w-[70%] flex items-center justify-center gap-4 rounded-xl bg-red-200 p-6">
                <AiFillExclamationCircle size={32} color="red" />
                <p className="text-2xl text-center flex justify-center text-red-700">
                    Not Authorized! Return to Home Page
                </p>
                <Link to={'/'} className="underline text-blue-500 text-2xl">
                    ( Home Page )
                </Link>
            </div>
        </div>
    );
};

export default NotAuthorized;
