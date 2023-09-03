import React from 'react';

const LoadingButton = ({ loading, onLoadMore }) => {
    return (
        <div className="mx-auto">
            {loading ? (
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white uppercase font-semibold text-lg rounded-md">
                    <span className="loading loading-spinner text-white"></span>
                    <h1>loading</h1>
                </button>
            ) : (
                <button
                    onClick={onLoadMore}
                    className="px-4 py-2 bg-secondary text-white uppercase font-semibold text-lg rounded-md">
                    load more
                </button>
            )}
        </div>
    );
};

export default LoadingButton;
