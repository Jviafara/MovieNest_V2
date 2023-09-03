import React from 'react';
import { MdFavorite } from 'react-icons/md';

const FavoriteButton = ({ loading, onFavoriteClick, isFavorite }) => {
    return (
        <div>
            {loading ? (
                <button>
                    <span className="loading loading-spinner text-secondary"></span>
                </button>
            ) : (
                <div>
                    {isFavorite ? (
                        <button onClick={onFavoriteClick}>
                            <MdFavorite color="red" size={32} />
                        </button>
                    ) : (
                        <button onClick={onFavoriteClick}>
                            <MdFavorite className="text-primary" size={32} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FavoriteButton;
