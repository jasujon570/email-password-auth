import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [error, setError] = useState('')
    const handleLogin = e=> {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setError('');


        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error.message)
            setError(error.message);
        })
    }

  return (
    <div className="card bg-base-100 w-full m-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-4 text-center">Login now!</h1>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        {
            error && <p className="text-red-500">{error}</p>
        }
        <p>New to our Website? Please <Link className="text-blue-400 underline" to='/register'>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
