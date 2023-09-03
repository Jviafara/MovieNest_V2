import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LogoSpinner from './LogoSpinner';

const GlobalLoading = () => {
    const { globalLoading } = useSelector((state) => state.globalLoading);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (globalLoading) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    }, [globalLoading]);

    return (
        <>
            {isLoading && (
                <div className="absolute w-screen h-screen backdrop-blur-lg z-[999]">
                    <div className="flex flex-col items-center gap-4 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
                        <LogoSpinner />
                        <div aria-label="Loading..." role="status">
                            <span className="loading loading-spinner w-[8rem] text-secondary"></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalLoading;
