import React from 'react';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import menuConfigs from '../../configs/menuConfig';
import { setAppState } from '../../redux/features/appStateSlice';
import { setUser } from '../../redux/features/userSlice';

const UserMenu = ({ open, toggleUserMenu }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);

    const handleClick = (item) => {
        dispatch(setAppState(item.state));
        toggleUserMenu();
        navigate(item.path);
    };

    const signout = () => {
        dispatch(setUser(null));
        navigate(0);
        toggleUserMenu();
    };
    return (
        <>
            {open && (
                <div className="absolute z-50 top-20 right-10 bg-base-300 py-4 px-8 rounded-lg flex flex-col gap-4">
                    <h1 className="text-xl font-bold text-primary px-3 py-1 w-full text-center">
                        {user?.name}
                    </h1>
                    <ul className="flex flex-col gap-2 justify-center text-primary text-lg">
                        {menuConfigs.user.map((item, index) => (
                            <li className="font-medium" key={index}>
                                {appState === item.state ? (
                                    <button
                                        className="uppercase flex gap-2 items-center py-1 bg-secondary px-4 rounded-xl text-white"
                                        onClick={() => handleClick(item)}>
                                        {item.icon}
                                        {item.display}
                                    </button>
                                ) : (
                                    <button
                                        className="uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2"
                                        onClick={() => handleClick(item)}>
                                        {item.icon}
                                        {item.display}
                                    </button>
                                )}
                            </li>
                        ))}
                        <li className="font-medium">
                            <button
                                className="uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2"
                                onClick={signout}>
                                <MdLogout size={24} />
                                <h1>SIGN OUT</h1>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default UserMenu;
