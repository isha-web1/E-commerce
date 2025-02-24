import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div className="hero bg-base-200 min-h-[100px]">
  <div className="hero-content block justify-center">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl block mx-auto my-4">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Email</label>
          <input id="email" type="email" className="input" placeholder="Email" />
          <label className="fieldset-label">Password</label>
          <input id="password" type="password" className="input" placeholder="Password" />
          <div><Link to='/register' className="link link-hover text-xl ">New here? Register</Link></div>
          <div><a className="link link-hover text-xl">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;