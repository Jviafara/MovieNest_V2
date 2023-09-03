import { Field, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/modules/userApi';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';
import Container from './Container';

const style = {
    error: `ring-red-500 ring-1 `,
    default:
        'w-full rounded-lg py-2 px-4 bg-base-300 text-primary  placeholder-primary/60 focus:ring-bluue-500 focus:outline-none focus:ring-1 ',
};

// Yup validation schema
const validateSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password minimum 8 characters')
        .max(16, 'Password maximum 16 characters')
        .required('Password required'),
    newPassword: Yup.string()
        .min(8, 'Password minimum 8 characters')
        .max(16, 'Password maximum 16 characters')
        .required('New Password required'),
    confirmNewPassword: Yup.string()
        .min(8, 'Comfirm password minimum 8 characters')
        .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match')
        .max(16, 'Comfirm password maximum 16 characters')
        .required('Comfirm Password required'),
});

const UpdateForm = () => {
    const dispatch = useDispatch();
    const [updateRequest, setUpdateRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const updateForm = useFormik({
        initialValues: {
            confirmNewPassword: '',
            newPassword: '',
            password: '',
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            setErrorMessage(undefined);
            setUpdateRequest(true);
            const { response, err } = await userApi.passwordUpdate(values);
            setUpdateRequest(false);

            if (response) {
                updateForm.resetForm();
                dispatch(setUser(null));
                dispatch(setAuthModalOpen(true));
                toast.success('Update password success! Please re-login');
                toast.success('User Password Updated');
            }
            if (err) setErrorMessage(err);
        },
    });

    return (
        <div className="w-full flex justify-center">
            <FormikProvider value={updateForm}>
                <Container header={'Update password'}>
                    <form onSubmit={updateForm.handleSubmit}>
                        <div className="flex flex-col items-center gap-3 w-[90vw] sm:w-[60vw] md:w-[50vw]">
                            <div className="w-full">
                                <Field
                                    error={
                                        updateForm.touched?.password &&
                                        updateForm.errors?.password
                                    }
                                    name="password"
                                    placeholder="Password"
                                    onChange={updateForm.handleChange}
                                    type="password"
                                    className={`${style.default}  ${
                                        updateForm.errors.password
                                            ? style.error
                                            : 'border-gray-300'
                                    }`}
                                />
                                <p className="text-sm text-red-600">
                                    {updateForm.errors?.password}
                                </p>
                            </div>
                            <div className="w-full">
                                <Field
                                    error={
                                        updateForm.touched?.newPassword &&
                                        updateForm.errors?.newPassword
                                    }
                                    name="newPassword"
                                    placeholder="New Password"
                                    onChange={updateForm.handleChange}
                                    type="password"
                                    className={`${style.default}  ${
                                        updateForm.errors.newPassword
                                            ? style.error
                                            : 'border-gray-300'
                                    }`}
                                />
                                <p className="text-sm text-red-600">
                                    {updateForm.errors?.newPassword}
                                </p>
                            </div>
                            <div className="w-full">
                                <Field
                                    error={
                                        updateForm.touched
                                            ?.confirmNewPassword &&
                                        updateForm.errors?.confirmNewPassword
                                    }
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    onChange={updateForm.handleChange}
                                    type="password"
                                    className={`${style.default}  ${
                                        updateForm.errors.confirmNewPassword
                                            ? style.error
                                            : 'border-gray-300'
                                    }`}
                                />
                                <p className="text-sm text-red-600">
                                    {updateForm.errors?.confirmNewPassword}
                                </p>
                            </div>

                            {updateRequest ? (
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center mt-1 w-2/3 bg-blue-600 hover:bg-opacity-90 hover:scale-105  text-white font-bold rounded-lg px-4 py-1 cursor-not-allowed">
                                    <svg
                                        className="w-5 h-5 mr-3 -ml-1 text-blue-200 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    className="mt-1 w-1/3 bg-secondary hover:bg-opacity-90 hover:scale-105  text-white font-bold rounded-lg px-4 py-1"
                                    type="submit">
                                    Update Password
                                </button>
                            )}

                            {errorMessage && (
                                <div className="text-red-600">
                                    <alert severity="error" variant="outlined">
                                        {errorMessage}
                                    </alert>
                                </div>
                            )}
                        </div>
                    </form>
                </Container>
            </FormikProvider>
        </div>
    );
};

export default UpdateForm;
