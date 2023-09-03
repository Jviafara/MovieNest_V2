import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageWrapper from './components/common/PageWrapper';
import MainLayout from './components/layout/MainLayout';
import { setThemeMode } from './redux/features/themeModeSlice';
import routes from './routes/routes';

import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { setAppState } from './redux/features/appStateSlice';

function App() {
    const dispatch = useDispatch();

    const { themeMode } = useSelector((state) => state.themeMode);
    const { authModalOpen } = useSelector((state) => state.authModal);

    const [width, setWidth] = useState('w-full');

    useEffect(() => {
        const theme = localStorage.getItem('themeMode');
        if (theme && theme !== themeMode) {
            dispatch(setThemeMode(theme));
        } else {
            dispatch(setThemeMode('dark'));
        }
    }, [dispatch]); // eslint-disable-line

    useEffect(() => {
        if (authModalOpen) {
            setWidth('w-[100vw]');
        } else {
            setWidth('w-full');
        }
    }, [authModalOpen]);

    useEffect(() => {
        dispatch(setAppState());
    }, [dispatch]);

    return (
        <div className={`${width} h-full bg-base-100`} data-theme={themeMode}>
            <ToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme={themeMode}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routes.map((route, index) =>
                            route.index ? (
                                <Route
                                    index
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            ) : (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            )
                        )}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
