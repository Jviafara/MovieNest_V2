import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const RemoveButton = ({ loading, onRemove }) => {
    return (
        <div>
            {loading ? (
                <button>
                    <span className="loading loading-spinner text-secondary"></span>
                </button>
            ) : (
                <button onClick={onRemove}>
                    <BsFillTrashFill color="red" />
                </button>
            )}
        </div>
    );
};

export default RemoveButton;
