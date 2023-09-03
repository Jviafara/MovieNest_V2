import { Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/modules/userApi';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';

const style = {
    error: `ring-red-500 ring-1`,
    default:
        'w-full rounded-lg py-2 px-4 bg-base text-primary placeholder-base focus:ring-bluue-500 focus:outline-none focus:ring-1 focus:border-transparent',
};

// Yup validation schema
const validateSchema = Yup.object().shape({
    name: Yup.string().required('Full Name required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string()
        .min(8, 'Password minimum 8 characters')
        .max(16, 'Password maximum 16 characters')
        .required('Password required'),
    confirmPassword: Yup.string()
        .min(8, 'Comfirm password minimum 8 characters')
        .max(16, 'Comfirm password maximum 16 characters')
        .required('Comfirm Password required'),
});

const SignupForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [isSignupRequest, setIsSignupRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signupForm = useFormik({
        initialValues: {
            confirmPassword: '',
            password: '',
            email: '',
            name: '',
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            setErrorMessage(undefined);
            setIsSignupRequest(true);
            const { response, err } = await userApi.signup(values);
            setIsSignupRequest(false);

            if (response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success('Sign in success');
            }
            if (err) setErrorMessage(err);
        },
    });

    return (
        <FormikProvider value={signupForm}>
            <form onSubmit={signupForm.handleSubmit}>
                <div className="flex flex-col items-center gap-3 ">
                    <div className="w-full">
                        <Field
                            error={
                                signupForm.touched?.name &&
                                signupForm.errors?.name
                            }
                            placeholder="Full Name"
                            name="name"
                            onChange={signupForm.handleChange}
                            type="text"
                            className={`${style.default} ${
                                signupForm.errors.name
                                    ? style.error
                                    : 'border-gray-300'
                            }`}
                        />
                        <p className="text-sm text-red-600">
                            {signupForm.errors?.name}
                        </p>
                    </div>
                    <div className="w-full">
                        <Field
                            error={
                                signupForm.touched?.email &&
                                signupForm.errors?.email
                            }
                            placeholder="Email"
                            name="email"
                            onChange={signupForm.handleChange}
                            type="text"
                            className={`${style.default} ${
                                signupForm.errors.email
                                    ? style.error
                                    : 'border-gray-300'
                            }`}
                        />
                        <p className="text-sm text-red-600">
                            {signupForm.errors?.email}
                        </p>
                    </div>
                    <div className="w-full">
                        <Field
                            error={
                                signupForm.touched?.password &&
                                signupForm.errors?.password
                            }
                            name="password"
                            placeholder="Password"
                            onChange={signupForm.handleChange}
                            type="password"
                            className={`${style.default}  ${
                                signupForm.errors.password
                                    ? style.error
                                    : 'border-gray-300'
                            }`}
                        />
                        <p className="text-sm text-red-600">
                            {signupForm.errors?.password}
                        </p>
                    </div>
                    <div className="w-full">
                        <Field
                            error={
                                signupForm.touched?.confirmPassword &&
                                signupForm.errors?.confirmPassword
                            }
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={signupForm.handleChange}
                            type="password"
                            className={`${style.default}  ${
                                signupForm.errors.confirmPassword
                                    ? style.error
                                    : 'border-gray-300'
                            }`}
                        />
                        <p className="text-sm text-red-600">
                            {signupForm.errors?.confirmPassword}
                        </p>
                    </div>
                    {isSignupRequest ? (
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
                            Sign Up
                        </button>
                    )}

                    <button
                        className="mt-1 w-2/3 hover:scale-105 hover:bg-gray-500 underline hover:bg-opacity-10 text-blue-600 font-bold rounded-lg px-4 py-1"
                        onClick={() => switchAuthState()}>
                        Sign In
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

export default SignupForm;
