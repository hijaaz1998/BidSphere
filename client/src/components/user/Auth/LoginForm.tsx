import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosEndPoints/userAxios";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/userSlice";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    credentialResponse.credential;
    const credential = credentialResponse.credential;
    const success = await axiosInstance.post("/user/googleAuth", {
      credential,
    });
    if (success) {
      localStorage.setItem("userToken", JSON.stringify(success.data.token));
      localStorage.setItem("userData", JSON.stringify(success.data.user));
      localStorage.setItem("userId", JSON.stringify(success.data.user?._id));
      dispatch(login(success.data.user));
      navigate("/home");
    }
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid Email");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      if (response.data.blocked) {
        toast.error("user have been blocked");
      }

      if (response.data.status) {
        const userData = response.data;

        localStorage.setItem(
          "userId",
          JSON.stringify(userData?.result?.user?._id)
        );
        localStorage.setItem(
          "userData",
          JSON.stringify(userData?.result?.user)
        );
        localStorage.setItem(
          "userToken",
          JSON.stringify(userData?.result?.token)
        );

        dispatch(login(userData.result.user));
        navigate("/home");
      } else {
        setError(response.data.result.error.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="p-8 w-full md:w-96">
          <h1 className="text-2xl font-bold mb-4">Sign in</h1>
          <h3 className="text-sm text-gray-600 mb-6">
            Enter your details to login.
          </h3>
          <form onSubmit={loginHandler} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="email"
                className="py-2 px-3 mb-3 w-full border rounded-md"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                className="py-2 px-3 mb-3 w-full border rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* Forgot Password link */}
              <p className="text-sm mt-2 text-gray-500 cursor-pointer">
                <Link to={"/forgot-password"}>Forgot Password?</Link>
              </p>
            </div>
            <div className="flex flex-col items-center">
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 mt-4 mb-3 rounded-md w-full"
              >
                Login
              </button>
              <p className="text-sm mt-2">
                Already have an account?{" "}
                <span className="text-blue-500 cursor-pointer">
                  <Link to={"/signup"}>Signup</Link>
                </span>
              </p>
            </div>
          </form>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
