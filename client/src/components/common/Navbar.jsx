import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import menuConfigs from '../../configs/menuConfig';
import { setAppState } from '../../redux/features/appStateSlice';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from './Logo';
import Sidebar from './Sidebar';
import ThemeButton from './ThemeButton';
import UserMenu from './UserMenu';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { appState } = useSelector((state) => state.appState);
    const { user } = useSelector((state) => state.user);
    const nameSplit = user?.name.split(' ');

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleClick = (item) => {
        dispatch(setAppState(item.state));
        navigate(item.path);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
        if (setUserMenuOpen) {
            setTimeout(() => {
                setUserMenuOpen(false);
            }, 5000);
        }
    };

    return (
        <div className="w-full relative">
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <UserMenu open={userMenuOpen} toggleUserMenu={toggleUserMenu} />
            <div className="absolute w-full h-auto flex justify-between items-center py-4 px-8 bg-base-300/70 ">
                <div
                    onClick={toggleSidebar}
                    className="md:hidden hover:scale-110 cursor-pointer flex gap-4 items-center justify-between">
                    <GiHamburgerMenu size={28} color="red" />
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <nav className="hidden md:inline-flex">
                    <div>
                        <ul className="flex gap-8 justify-center text-primary">
                            {menuConfigs.main.map((item, index) => (
                                <li key={index} className="font-medium">
                                    {appState === item.state ? (
                                        <button
                                            className="uppercase bg-secondary px-4 rounded-xl text-white"
                                            onClick={() => handleClick(item)}>
                                            {item.display}
                                        </button>
                                    ) : (
                                        <button
                                            className="uppercase rounded-lg hover:bg-secondary/40 hover:px-2"
                                            onClick={() => handleClick(item)}>
                                            {item.display}
                                        </button>
                                    )}
                                </li>
                            ))}
                            <li className="hover:scale-110">
                                <ThemeButton />
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="hover:scale-105 hidden lg:inline-flex lg:absolute lg:top-1/2 lg:left-1/2  lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="sm:hidden cursor-pointer">
                    {user ? (
                        <div>
                            <h1 className="bg-secondary text-white text-lg px-2 p-1 rounded-full font-medium hover:scale-105">
                                {nameSplit[0].charAt(0).toUpperCase()}
                                {nameSplit.length > 1 &&
                                    nameSplit[1].charAt(0).toUpperCase()}
                            </h1>
                        </div>
                    ) : (
                        <button
                            className="uppercase bg-secondary px-4 py-2 rounded-xl text-white"
                            onClick={() => dispatch(setAuthModalOpen(true))}>
                            Sign In
                        </button>
                    )}
                </div>
                <div className="hidden sm:inline-flex cursor-pointer">
                    {user ? (
                        <button
                            onClick={toggleUserMenu}
                            className="bg-secondary text-white text-lg px-2 py-1 rounded-full font-medium hover:scale-105">
                            {user.name}
                        </button>
                    ) : (
                        <button
                            className="uppercase bg-secondary px-4 py-2 rounded-xl text-white"
                            onClick={() => dispatch(setAuthModalOpen(true))}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
