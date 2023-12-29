import React from "react";

const Spinner = ({ children }) => {
    return (
        <div className='spinner__container'>
            <div className='spinner__overlay'>
                <span className='spinner__loader'></span>
                {children}
            </div>
        </div>
    );
};

export default Spinner;
