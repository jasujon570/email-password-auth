import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log("register clicked", email, password, terms);
    setError("");
    setSuccess(false);


    if(!terms){
      setError('Please accept our terms and conditions');
      return;
    }

    // const passwordPattern = /^.{6,}$/;
    // const passwordCasePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    // const specialPasswordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    // if(!passwordPattern.test(password)){
    //   setError('Password should be at least 6 characters')
    //   return;
    // }else if (!passwordCasePattern.test(password)){
    //   setError('Password should contains at least one uppercase and one lowercase character')
    //   return;
    // }else if (!specialPasswordPattern.test(password)){
    //   setError('Password must include at least one special character (e.g. @, #, $, !, %).")')
    //   return;
    // }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("After creation of a new user", result.user);
        setSuccess(true);
        e.target.reset();
        // send verification email

        sendEmailVerification(result.user).then(() => {
          alert("Please login to your email and verify your email address");
        });
      })
      .catch((error) => {
        console.log("Error happened", error.message);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="text-center lg:text-left mb-5">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs absolute top-2 right-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div>
                  <label class="label">
                    <input type="checkbox" name="terms" class="checkbox" />
                    Accept Our Terms and Conditions.
                  </label>
                </div>

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account created successfully</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p>Already have an account? Please <Link className="text-blue-400 underline" to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
