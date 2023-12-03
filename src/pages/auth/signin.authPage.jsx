import React from "react";
import SignInForm from "../../components/form/signin.form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignInMutation } from "../../service/api/authApi.service";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { errroAuthMessage } from "./auth.config";
import { setSessionId } from "../../service/slices/app.slice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./authLayout";
//vlidation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignInPage = () => {
  //hook
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.sessionId);
  const dispatch = useDispatch();
  //mutations signin
  const [signIn, { data, isLoading, isSuccess, isError, error }] =
    useSignInMutation();

  //sign in states
  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await signIn(values);
    },
  });

  //
  useEffect(() => {
    if ((isSuccess, data !== undefined)) {
      if (data.code === 200) {
        const stringyFyData = JSON.stringify(data.data);
        dispatch(setSessionId(stringyFyData));
      }
    }
  }, [isSuccess, data]);
  //error
  useEffect(() => {
    if (isError && error !== undefined) {
      if (error.status === 403) {
        toast.error(errroAuthMessage["404Message"]);
      }
      if (error.status === 500) {
        toast.error(errroAuthMessage["500Message"]);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (auth !== null) {
      navigate("/");
    }
  }, [auth]);
  return (
    <AuthLayout label={"Welcome Back"}>
      <SignInForm signInForm={signInForm} />
    </AuthLayout>
  );
};

export default SignInPage;
