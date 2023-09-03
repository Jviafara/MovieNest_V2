import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../api/modules/userApi';
import UpdateForm from '../components/common/UpdateForm';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { setUser } from '../redux/features/userSlice';

const PasswordUpdate = () => {
    const [onRequest, setOnRequest] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'password minimum 8 characters')
                .required('password is required'),
            newPassword: Yup.string()
                .min(8, 'newPassword minimum 8 characters')
                .required('newPassword is required'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match')
                .min(8, 'confirmNewPassword minimum 8 characters')
                .required('confirmNewPassword is required'),
        }),
        onSubmit: async (values) => onUpdate(values),
    });

    const onUpdate = async (values) => {
        if (onRequest) return;
        setOnRequest(true);

        const { response, err } = await userApi.passwordUpdate(values);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            form.resetForm();
            navigate('/');
            dispatch(setUser(null));
            dispatch(setAuthModalOpen(true));
            toast.success('Update password success! Please re-login');
            navigate(0);
        }
    };

    return (
        <div className="w-full min-h-screen max-w-[1366px] mx-auto  p-12 my-10">
            <UpdateForm />
        </div>
    );
};

export default PasswordUpdate;
