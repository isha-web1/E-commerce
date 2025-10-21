import { Link, useNavigate, useLocation, useFormAction } from "react-router-dom";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { useLoginMutation } from "../redux/api/Auth/authApi";


// Define the shape of your login form data
interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    // 🔑 Hooks for form management, navigation, and API
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    
    // Get the login mutation hook
    const [login, { isLoading }] = useLoginMutation();

    // Determine where to redirect: either the page they came from (location.state.from) or the homepage ('/')
    const from = location.state?.from?.pathname || "/";
    
    // 🔑 Function to handle form submission
    const onSubmit = async (data: LoginFormInputs) => {
        try {
            // 1. Call the login mutation
            await login(data).unwrap(); 

            // 2. SUCCESS: Show success notification
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 1500
            });
            
            // 3. REDIRECT: Redirect the user to the intended page or home
            navigate(from, { replace: true });

        } catch (error: any) {
            // 4. ERROR: Handle login failure (e.g., incorrect credentials)
            console.error("Login failed:", error);
            
            // Get the error message from the response (adjust based on your API)
            const errorMessage = error?.data?.message || "Invalid email or password. Please try again.";

            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
            });
        }
    };

    return (
        <div className="hero bg-base-200 min-h-[100vh]">
            <div className="hero-content block justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl block mx-auto my-4">
                    {/* 🔑 Use handleSubmit from react-hook-form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="fieldset">
                            <label className="fieldset-label">Email</label>
                            {/* 🔑 Register input with RHF */}
                            <input 
                                id="email" 
                                type="email" 
                                className="input" 
                                placeholder="Email" 
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">Email is required</span>}

                            <label className="fieldset-label">Password</label>
                            {/* 🔑 Register input with RHF */}
                            <input 
                                id="password" 
                                type="password" 
                                className="input" 
                                placeholder="Password" 
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500">Password is required</span>}

                            <div><Link to='/register' className="link link-hover text-xl ">New here? Register</Link></div>
                            <div><a className="link link-hover text-xl">Forgot password?</a></div>
                            
                            {/* 🔑 Submit button, disabled while loading */}
                            <button className="btn btn-neutral mt-4" type="submit" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;