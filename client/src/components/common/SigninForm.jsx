import { Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/modules/userApi';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';

const style = {
    error: `ring-red-500 ring-1 `,
    default:
        'w-full rounded-lg py-2 px-4 bg-base text-primary placeholder-base focus:ring-bluue-500 focus:outline-none focus:ring-1 focus:border-transparent',
};

// Yup validation schema
const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string()
        .min(8, 'Password minimum 8 characters')
        .max(16, 'Password maximum 16 characters')
        .required('Password required'),
});

const SigninForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signinForm = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            setErrorMessage(undefined);
            setIsLoginRequest(true);
            const { response, err } = await userApi.signin(values);
            setIsLoginRequest(false);

            if (response) {
                signinForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success('Sign in success');
            }
            if (err) setErrorMessage(err.message);
        },
    });

    return (
        <FormikProvider value={signinForm}>
            <form onSubmit={signinForm.handleSubmit}>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-full">
                        <Field
                            error={
                                signinForm.touched?.email &&
                                signinForm.errors?.email
                            }
                            placeholder="Email"
                            name="email"
                            onChange={signinForm.handleChange}
                            type="text"
                            className={`${style.default} ${
                                signinForm.errors.email
                                    ? style.error
                                    : 'border-gray-300'
                            }`}
                        />
                        <p className="text-sm text-red-600">
                            {signinForm.errors?.email}
                        </p>
                    </div>
                    <div className="w-full">
                        <Field
                            error={
                                signinForm.touched?.password &&
                                signinForm.errors?.password
                            }
                            name="password"
                            placeholder="Password"
                            onChange={signinForm.handleChange}
                            type="password"
                            className={`${style.default}  ${
                                signinForm.errors.password
                                    ? style.error
                                    : 'border-gray-300'
                            }`}
                        />
                        <p className="text-sm text-red-600">
                            {signinForm.errors?.password}
                        </p>
                    </div>

                    {isLoginRequest ? (
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
                            className="mt-1 w-2/3 bg-secondary hover:bg-opacity-90 hover:scale-105  text-white font-bold rounded-lg px-4 py-1"
                            type="submit">
                            Sign In
                        </button>
                    )}

                    <button
                        className="mt-1 w-2/3 underline hover:scale-105 hover:bg-gray-500 hover:bg-opacity-10 text-blue-600 font-bold rounded-lg px-4 py-1"
                        onClick={() => switchAuthState()}>
                        Sign Up
                    </button>

                    {errorMessage && (
                        <div className="text-red-600">
                            <alert severity="error" variant="outlined">
                                {errorMessage}
                            </alert>
                        </div>
                    )}
                </div>
            </form>
        </FormikProvider>
    );
};

export default SigninForm;
