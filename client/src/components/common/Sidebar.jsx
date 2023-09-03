import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import menuConfigs from '../../configs/menuConfig';
import { setAppState } from '../../redux/features/appStateSlice';
import { setUser } from '../../redux/features/userSlice';
import Logo from './Logo';
import ThemeButton from './ThemeButton';

const Sidebar = ({ open, toggleSidebar }) => {
    const sideNavRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { themeMode } = useSelector((state) => state.themeMode);
    const { appState } = useSelector((state) => state.appState);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                sideNavRef.current &&
                !sideNavRef.current.contains(event.target)
            ) {
                toggleSidebar();
            }
        }
        // Add event listener to the document object
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleSidebar]);

    const handleClick = (item) => {
        dispatch(setAppState(item.state));
        toggleSidebar();
        navigate(item.path);
    };

    return (
        <Transition.Root show={open} as={Fragment} data-theme={themeMode}>
            <Dialog as="div" className="relative z-10" onClose={toggleSidebar}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 backdrop-blur-sm transition-opacity" />
                </Transition.Child>
                {open && (
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="-translate-x-full "
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full">
                        <div
                            ref={sideNavRef}
                            id="sidebar"
                            className="w-[300px] h-screen p-4 flex flex-col gap-2 fixed inset-0 backdrop-blur-lg text-black  md:hidden">
                            <Logo />
                            <h6 className="mt-6 mb-2 font-bold text-xl text-primary">
                                MENU
                            </h6>
                            <ul className="flex flex-col gap-2 ml-4 justify-center  text-primary text-lg">
                                {menuConfigs.main.map((item, index) => (
                                    <li key={index} className="font-medium">
                                        {appState === item.state ? (
                                            <button
                                                className="uppercase flex gap-2 items-center py-1 bg-secondary px-4 rounded-xl text-white"
                                                onClick={() =>
                                                    handleClick(item)
                                                }>
                                                {item.icon}
                                                {item.display}
                                            </button>
                                        ) : (
                                            <button
                                                className="uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2"
                                                onClick={() =>
                                                    handleClick(item)
                                                }>
                                                {item.icon}
                                                {item.display}
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {user && (
                                <div className="sm:hidde">
                                    <h6 className="mt-6 mb-2 font-bold text-xl text-primary">
                                        USER
                                    </h6>
                                    <ul className="flex flex-col gap-2 ml-4 justify-center text-primary text-lg">
                                        {menuConfigs.user.map((item, index) => (
                                            <li
                                                className="font-medium"
                                                key={index}>
                                                {appState === item.state ? (
                                                    <button
                                                        className="uppercase flex gap-2 items-center py-1 bg-secondary px-4 rounded-xl text-white"
                                                        onClick={() =>
                                                            handleClick(item)
                                                        }>
                                                        {item.icon}
                                                        {item.display}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2"
                                                        onClick={() =>
                                                            handleClick(item)
                                                        }>
                                                        {item.icon}
                                                        {item.display}
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                        <li className="font-medium">
                                            <button
                                                className="uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2"
                                                onClick={() =>
                                                    dispatch(setUser(null))
                                                }>
                                                <MdLogout size={24} />
                                                <h1>SIGN OUT</h1>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div>
                                <h6 className="mt-6 mb-2 font-bold text-xl text-primary">
                                    THEME
                                </h6>
                                <div className="ml-4 hover:scale-105 w-fit">
                                    <ThemeButton />
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                )}
            </Dialog>
        </Transition.Root>
    );
};

export default Sidebar;
