import React from 'react';

const Container = ({ header, children }) => {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-12  w-full md:max-w-[70vw] px-[20px] md:p-0">
                {header && (
                    <div
                        className="relative w-full before:content-[''] before:absolute xs:before:left-[20px] md:before:left-0 
              before:top-full before:h-[5px] before:w-[150px] before:bg-secondary flex justify-start">
                        <h1 className="font-bold uppercase text-primary text-2xl font-roboto">
                            {header}
                        </h1>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Container;
