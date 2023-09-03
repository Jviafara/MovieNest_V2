import React from 'react';

const ImageHeader = ({ imgPath }) => {
    return (
        <div className="">
            <div
                style={{
                    backgroundImage: `url(${imgPath})`,
                }}
                className="relative z-[0] pt-[60%] sm:pt-[40%] md:pt-[35%] bg-cover bg-top bg-fixed before:content-[''] before:w-full before:h-full before:absolute before:bottom-0 before:left-0 before:pointer-events-none"
            />
            <div className="w-full pt-[60%] sm:pt-[40%] md:pt-[35%] absolute top-0 left-0 bg-gradient-to-t from-base-100" />
        </div>
    );
};

export default ImageHeader;
