/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import favoriteApi from '../../api/modules/favoriteApi';
import userApi from '../../api/modules/userApi';
import { setListFavorites, setUser } from '../../redux/features/userSlice';
// import Footer from '../common/Footer';
import { Helmet } from 'react-helmet-async';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { setAppState } from '../../redux/features/appStateSlice';
import AuthModal from '../common/AuthModal';
import Footer from '../common/Footer';
import GlobalLoading from '../common/GlobalLoading';
import Navbar from '../common/Navbar';

const MainLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);

    useEffect(() => {
        if (location.pathname !== '/') {
            dispatch(setAppState(location.pathname.substring(1)));
        } else {
            dispatch(setAppState('home'));
        }
    }, [dispatch, location, appState]);

    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getInfo();

            if (response) dispatch(setUser(response));
            if (err) dispatch(setUser(null));
        };
        authUser();
    }, [dispatch]);

    useEffect(() => {
        const gegtFavorites = async () => {
            const { response, err } = await favoriteApi.getList();

            if (response) dispatch(setListFavorites(response));
            if (err) toast(err.message);
        };
        if (user) gegtFavorites();
        if (!user) dispatch(setListFavorites([]));
    }, [user, dispatch]);

    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>{appState?.toUpperCase()}</title>
            </Helmet>
            {/* Helmet */}

            {/* global loading */}
            <GlobalLoading />
            {/* global loading */}

            {/* login modal */}
            <AuthModal />
            {/* login modal */}

            <div className="flex flex-col">
                {/* header */}
                <div className="w-full top-0 left-0 z-[10] flex flex-col items-center bg-gray-200 bg-opacity-50 backdrop-blur-2xl">
                    <Navbar />
                </div>
                {/* header */}

                {/* main */}
                <div className="flex-grow overflow-hidden">
                    <Outlet />
                </div>
                {/* main */}
            </div>

            <div className="fixed bottom-20 right-2 md:right-10 z-[10]">
                <button
                    type="button"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }
                    className="hidden md:inline-flex cursor-pointer ">
                    <BsFillArrowUpSquareFill color="red" size={45} />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }
                    className="md:hidden inline-flex cursor-pointer ">
                    <BsFillArrowUpSquareFill color="red" size={32} />
                </button>
            </div>

            {/* footer */}
            <Footer />
            {/* footer */}
        </>
    );
};

export default MainLayout;
