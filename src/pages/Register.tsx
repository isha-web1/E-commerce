import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { setEmail, setName, setPassword, setRole } from "../redux/feature/RegisterSlice";

const Register = () => {
    const dispatch = useAppDispatch();
    const {name, email, password,role} = useAppSelector((store:RootState) => store.register);

    const handleSubmit = (e : any)=>{
     e.preventDefault();
     console.log('our input',{name, email, password, role})
    }
  return (
    <div className="hero bg-base-200 min-h-[100px]">
      <div className="hero-content block justify-center">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl block mx-auto my-4">
          <div className="card-body">
            <form className="fieldset" onSubmit={handleSubmit}>
              <label className="fieldset-label">Name</label>
              <input id="name" value={name} onChange={(e) =>dispatch(setName(e.target.value))} type="name" className="input" placeholder="name" />
              <label className="fieldset-label">Email</label>
              <input value={email} onChange={(e) =>dispatch(setEmail(e.target.value))} id="email" type="email" className="input" placeholder="Email" />
              <label className="fieldset-label">Role</label>
              <input value={role} onChange={(e) =>dispatch(setRole(e.target.value))} id="role" type="text" className="input" placeholder="Role" />
              <label className="fieldset-label">Password</label>
              <input value={password} onChange={(e) =>dispatch(setPassword(e.target.value))} id="password" type="password" className="input" placeholder="Password" />
              <div>
                <Link to='/login' className="link link-hover">All ready have account?login'Login now</Link>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
