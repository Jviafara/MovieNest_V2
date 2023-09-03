import ProtectedPage from '../components/common/ProtectedPage';
import FavoriteList from '../pages/FavoriteList';
import Home from '../pages/Home';
import MediaDetails from '../pages/MediaDetails';
import MediaList from '../pages/MediaList';
import PasswordUpdate from '../pages/PasswordUpdate';
import PersonDetails from '../pages/PersonDetails';
import ReviewList from '../pages/ReviewList';
import Search from '../pages/Search';

export const routesGen = {
    home: '/',
    mediaList: (type) => `/${type}`,
    mediaDetail: (type, id) => `/${type}/${id}`,
    search: '/search',
    person: (id) => `/person/${id}`,
    favoriteList: '/favorites',
    reviewList: '/reviews',
    passwordUpdate: '/password-update',
};

const routes = [
    {
        index: true,
        element: <Home />,
        state: 'home',
    },
    {
        path: '/person/:personId',
        element: <PersonDetails />,
        state: 'person-details',
    },
    {
        path: '/search',
        element: <Search />,
        state: 'search',
    },
    {
        path: '/password-update',
        element: (
            <ProtectedPage>
                <PasswordUpdate />
            </ProtectedPage>
        ),
        state: 'password.update',
    },
    {
        path: '/favorites',
        element: (
            <ProtectedPage>
                <FavoriteList />
            </ProtectedPage>
        ),
        state: 'favorites',
    },
    {
        path: '/reviews',
        element: (
            <ProtectedPage>
                <ReviewList />
            </ProtectedPage>
        ),
        state: 'reviews',
    },
    {
        path: '/:mediaType',
        element: <MediaList />,
    },
    {
        path: '/:mediaType/:mediaId',
        element: <MediaDetails />,
    },
];

export default routes;
