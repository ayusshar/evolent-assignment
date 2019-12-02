import React from 'react';

const Toaster = ({ message, classname }) => {
    return (
        <div className={`toaster ${classname}`}>{message}</div>
    )
}

export default Toaster;