import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import {
    MdLiveTv,
    MdLockReset,
    MdOutlineFavoriteBorder,
    MdRateReview,
    MdSlideshow,
} from 'react-icons/md';

const main = [
    {
        display: 'home',
        path: '/',
        icon: <AiOutlineHome size={24} />,
        state: 'home',
    },
    {
        display: 'movies',
        path: '/movie',
        icon: <MdSlideshow size={24} />,
        state: 'movie',
    },
    {
        display: 'tv series',
        path: '/tv',
        icon: <MdLiveTv size={24} />,
        state: 'tv',
    },
    {
        display: 'search',
        path: '/search',
        icon: <AiOutlineSearch size={24} />,
        state: 'search',
    },
];

const user = [
    {
        display: 'favorites',
        path: '/favorites',
        icon: <MdOutlineFavoriteBorder size={24} />,
        state: 'favorites',
    },
    {
        display: 'reviews',
        path: '/reviews',
        icon: <MdRateReview size={24} />,
        state: 'reviews',
    },
    {
        display: 'password update',
        path: '/password-update',
        icon: <MdLockReset size={24} />,
        state: 'password-update',
    },
];

const menuConfigs = { main, user };

export default menuConfigs;
