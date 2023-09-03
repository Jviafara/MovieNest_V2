import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import NotAuthorized from './NotAuthorized';

const ProtectedPage = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setAuthModalOpen(!user));
    }, [user, dispatch]);

    return (
        <div className="min-h-screen">
            {user ? children : <NotAuthorized />}
        </div>
    );
};

export default ProtectedPage;
