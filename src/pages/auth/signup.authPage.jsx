import React from "react";
import SignUpForm from "../../components/form/signup.form";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useSignUpMutation,
} from "../../service/api/authApi.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { setSessionId } from "../../service/slices/app.slice";
import { errroAuthMessage } from "./auth.config";
import AuthLayout from "./authLayout";

//validation schema
const validationSchema = Yup.object({
  fullname: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

//
const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.sessionId);

  //mutation signup
  const [signUp, { isLoading }] = useSignUpMutation();
//
  const signUpForm = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await signUp(values);
      if (response.data) {
        if (response.data.code === 201) {
          dispatch(setSessionId(JSON.stringify(response.data.data)));
          navigate("/");
        }
      }
      if (response.error) {
        if (response.error.status === 403) {
          toast.error(errroAuthMessage["403Message"]);
        }
        if (response.error.status === 500) {
          toast.error(errroAuthMessage["500Message"]);
        }
      }
    },
  });

  useEffect(() => {
    if (auth !== null) {
      navigate("/");
    }
  }, [auth]);

  return (
    <AuthLayout type="signup">
      <SignUpForm signUpForm={signUpForm} />
    </AuthLayout>
  );
};

export default SignUpPage;
