import React from 'react';
import { BiSolidMoon, BiSun } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from '../../redux/features/themeModeSlice';

const ThemeButton = () => {
    const { themeMode } = useSelector((state) => state.themeMode);
    const dispatch = useDispatch();

    const temeToggle = () => {
        const theme = themeMode === 'dark' ? 'light' : 'dark';
        dispatch(setThemeMode(theme));
    };
    return (
        <div>
            {themeMode === 'dark' ? (
                <button onClick={temeToggle}>
                    <BiSun size={24} className="text-primary" />
                </button>
            ) : (
                <button onClick={temeToggle}>
                    <BiSolidMoon size={24} className="text-primary" />
                </button>
            )}
        </div>
    );
};

export default ThemeButton;
