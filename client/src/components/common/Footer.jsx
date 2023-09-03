import React from 'react';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menuConfig';
import Logo from './Logo';

const Footer = () => {
    return (
        <div className="relative w-full overflow-hidden h-auto flex justify-between items-center px-8 py-4 bg-base-300">
            <div className="hover:scale-105 hover:bg-base-100 py-1 px-2 rounded">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div>
                <nav>
                    <div>
                        <ul className="flex gap-1 sm:gap-4 justify-center text-primary">
                            {menuConfigs.main.map((item, index) => (
                                <li
                                    key={index}
                                    className="font-medium hover:scale-105 hover:bg-base-100 py-1 px-2 rounded">
                                    <Link
                                        to={item.path}
                                        className="uppercase hidden md:inline-flex items-center gap-2">
                                        <div>{item.icon}</div>
                                        {item.display}
                                    </Link>
                                    <Link
                                        to={item.path}
                                        className="uppercase md:hidden  items-center gap-2">
                                        {item.icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Footer;
