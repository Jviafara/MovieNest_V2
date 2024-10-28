import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import tmdbConfigs from '../../api/config/tmdbConfigs';
import mediaApi from '../../api/modules/mediaApi';
import userApi from '../../api/modules/userApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';
import { setServerLoadOpen } from '../../redux/features/serverLoadSlice';
import { setUser } from '../../redux/features/userSlice';
import Logo from './Logo';

const actionState = {
    signin: 'signin',
    signup: 'signup',
};

const LoadingServer = () => {
    const { serverLoadOpen } = useSelector((state) => state.serverLoad);
    const [movies, setMovies] = useState([]);
    const { themeMode } = useSelector((state) => state.themeMode);

    const mediaType = tmdbConfigs.mediaType.movie;
    const mediaCategory = tmdbConfigs.mediaCategory.popular;

    const dispatch = useDispatch();

    useEffect(() => {
        const getMedias = async () => {
            const { response, err } = await mediaApi.getList({
                mediaType,
                mediaCategory,
                page: 1,
            });

            if (response) dispatch(setServerLoadOpen(false));
            if (err) dispatch(setServerLoadOpen(true));
            dispatch(setGlobalLoading(false));
        };

        getMedias();

        //   if (!movies) dispatch(setServerLoadOpen(!serverLoadOpen));
    }, [dispatch]);

    const authModalRef = useRef(null);

    const handleClose = () => dispatch(setServerLoadOpen(false));

    return (
        <Transition show={serverLoadOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed top-0 left-0 w-full h-full z-10'
                onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div
                        className='w-full h-full
                        backdrop-blur-sm transition-opacity'
                    />
                </Transition.Child>
                {serverLoadOpen && (
                    <div
                        data-theme={themeMode}
                        ref={authModalRef}
                        className='w-[90%] md:max-w-[600px]  rounded-xl fixed transform top-[20%] left-[5%] -translate-y-[20%]  lg:top-[50%] md:left-[50%]  md:-translate-x-[50%] lg:-translate-y-[50%] backdrop-blur-lg text-black '>
                        <div className='bg-gray-300 bg-opacity-70 rounded-xl p-4 lg:p-8'>
                            <div className='mb-4 flex justify-center'>
                                <Logo />
                                <h1>Loading Server</h1>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </Transition>
    );
};

export default LoadingServer;
