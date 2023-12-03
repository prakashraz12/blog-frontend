import React from "react";
import AnimationWrapper from "../../components/animation/animation.wrapper";
import { useGoogleAuthMutation } from "../../service/api/authApi.service";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../imgs/google.png";
import { Link } from "react-router-dom";
import { authWihGoogle } from "../../utils/firebase.utils";
import { setSessionId } from "../../service/slices/app.slice";
import { errroAuthMessage } from "./auth.config";

const AuthLayout = ({ children, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [googleAuth] = useGoogleAuthMutation();

  const handleWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const user = await authWihGoogle();
      const response = await googleAuth({ access_token: user.accessToken });
      if (response.error) {
        if (response.error.status === 403) {
          return toast.error(errroAuthMessage["403Message"]);
        }
        if (response.error.status === 500) {
          return toast.error(errroAuthMessage["500Message"]);
        }
      }
      if (response.data) {
        if (response.data.code === 201) {
          dispatch(setSessionId(JSON.stringify(response.data.data)));
          navigate("/");
        }
        if (response.data.code === 200) {
          dispatch(setSessionId(JSON.stringify(response.data.data)));
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Error in handleWithGoogle:", err);
      toast.error("Trouble with Google authentication");
    }
  };

  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <div className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-20">
            {type === "signup" ? "Join Us Today!" : "welcome Back!"}
          </h1>
          {children}
          <div className="relative flex w-full items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex items-center justify-center gap-4 w-[80%] center"
            onClick={handleWithGoogle}
          >
            {" "}
            <img src={googleIcon} className="w-5" alt="google-image" />
            Continue With Google
          </button>
          <p className="mt-6 tex-dark-gray text-xl text-center">
            {type === "signup" ? "Already Have and Account?" : "New?"}
            <Link
              className="underline text-black text-xl ml-1"
              to={type === "signup" ? "/" : "/signup"}
            >
              {type === "signup" ? "Sign-in" : "Join Today!"}
            </Link>
          </p>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default AuthLayout;
